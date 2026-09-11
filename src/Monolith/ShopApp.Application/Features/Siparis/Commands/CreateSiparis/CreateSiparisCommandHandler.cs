using MediatR;
using Microsoft.EntityFrameworkCore;
using ShopApp.Application.Common.Interfaces;
using src.Monolith.ShopApp.Domain.Sepet.Enums;
using src.Monolith.ShopApp.Domain.Siparis.Entities;

namespace ShopApp.Application.Features.Siparis.Commands.CreateSiparis;

/// <summary>
/// Converts the authenticated customer's active basket into an order:
/// re-validates every line against the current, authoritative Urun/UrunVaryant
/// state (active + stock), snapshots it into SiparisUrunleri, then closes
/// the basket. All reads/writes happen against one IShopAppDbContext and are
/// committed in a single SaveChangesAsync so the order and basket-closure
/// either both happen or neither does.
/// </summary>
public sealed class CreateSiparisCommandHandler(
    IShopAppDbContext context,
    ICurrentCustomerContext currentCustomerContext)
    : IRequestHandler<CreateSiparisCommand, Guid>
{
    public async Task<Guid> Handle(CreateSiparisCommand request, CancellationToken cancellationToken)
    {
        var customer = await currentCustomerContext.GetRequiredAsync(cancellationToken);

        var sepet = await context.Sepetler
            .Include(s => s.Urunler)
            .FirstOrDefaultAsync(s => s.MusteriId == customer.MusteriId && s.DurumId == (int)SepetDurum.Aktif, cancellationToken);

        if (sepet is null || sepet.Urunler.Count == 0)
            throw new InvalidOperationException("Sepetiniz boş. Sipariş oluşturmak için sepetinize ürün ekleyin.");

        // Frontend validation (CartPage's address-required prompt) is for UX
        // only — this is the actual enforcement, so POSTing directly to this
        // endpoint can't skip it. A customer may add products to the basket
        // with zero saved addresses; they just can't convert it into a
        // Siparis until at least one exists. Sepet itself carries no address
        // selection (no Sepet.AdresId) — that is a later checkout/payment
        // concern, not this minimum rule.
        var hasAddress = await context.Adresler
            .AsNoTracking()
            .AnyAsync(a => a.MusteriId == customer.MusteriId, cancellationToken);

        if (!hasAddress)
            throw new InvalidOperationException("Sipariş oluşturabilmek için önce teslimat adresi eklemelisiniz.");

        var urunVaryantIds = sepet.Urunler.Select(u => u.UrunVaryantId).ToList();
        var urunVaryantler = await context.UrunVaryant
            .Include(t => t.Urun)
            .Where(t => urunVaryantIds.Contains(t.Id))
            .ToDictionaryAsync(t => t.Id, cancellationToken);

        var siparisNumarasi = $"SIP-{DateTime.UtcNow:yyyyMMddHHmmss}-{Guid.NewGuid().ToString("N")[..6].ToUpperInvariant()}";
        var siparis = SiparisEntity.Olustur(customer.MusteriId, siparisNumarasi, customer.KullaniciId);

        var araToplam = 0m;
        foreach (var sepetUrunu in sepet.Urunler)
        {
            // Re-validate against the CURRENT catalog/stock state — the basket
            // may have been sitting for a while, so its stored FiyatGecmis
            // and the item's continued availability cannot be trusted as-is.
            if (!urunVaryantler.TryGetValue(sepetUrunu.UrunVaryantId, out var urunVaryant))
                throw new InvalidOperationException("Sepetinizdeki bir ürün artık mevcut değil.");

            if (!urunVaryant.AktifMi || !urunVaryant.Urun.AktifMi)
                throw new InvalidOperationException($"'{urunVaryant.Urun.UrunAd}' artık satışta değil.");

            if (sepetUrunu.UrunMiktar > urunVaryant.StokAdet)
                throw new InvalidOperationException($"'{urunVaryant.Urun.UrunAd}' için yeterli stok bulunmuyor.");

            var birimFiyat = urunVaryant.Urun.Fiyat + urunVaryant.FiyatFarki;

            var satir = siparis.UrunEkle(
                urunVaryant.Id,
                urunVaryant.UrunId,
                $"{urunVaryant.Urun.UrunAd} ({urunVaryant.Renk ?? urunVaryant.Beden ?? "Standart"})",
                urunVaryant.Urun.Detay,
                urunVaryant.StokKod,
                sepetUrunu.UrunMiktar,
                birimFiyat,
                indirimOrani: 0m,
                customer.KullaniciId,
                urunVaryant.Beden,
                urunVaryant.Renk);

            araToplam += satir.ToplamFiyat;
        }

        siparis.ToplamlariGuncelle(araToplam, indirimTutari: 0m, kargoFiyat: 0m);

        context.Siparisler.Add(siparis);
        sepet.DurumuGuncelle((int)SepetDurum.Tamamlanmis, customer.KullaniciId);

        await context.SaveChangesAsync(cancellationToken);
        return siparis.Id;
    }
}
