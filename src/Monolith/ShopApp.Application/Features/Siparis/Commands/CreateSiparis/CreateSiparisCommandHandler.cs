using MediatR;
using Microsoft.EntityFrameworkCore;
using ShopApp.Application.Common.Interfaces;
using src.Monolith.ShopApp.Domain.Sepet.Enums;
using src.Monolith.ShopApp.Domain.Siparis.Entities;

namespace ShopApp.Application.Features.Siparis.Commands.CreateSiparis;

/// <summary>
/// Converts the authenticated customer's active basket into an order:
/// re-validates every line against the current, authoritative Urun/UrunTur
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

        var urunTurIds = sepet.Urunler.Select(u => u.UrunTurId).ToList();
        var urunTurler = await context.UrunTur
            .Include(t => t.Urun)
            .Where(t => urunTurIds.Contains(t.Id))
            .ToDictionaryAsync(t => t.Id, cancellationToken);

        var siparisNumarasi = $"SIP-{DateTime.UtcNow:yyyyMMddHHmmss}-{Guid.NewGuid().ToString("N")[..6].ToUpperInvariant()}";
        var siparis = SiparisEntity.Olustur(customer.MusteriId, siparisNumarasi, customer.KullaniciId);

        var araToplam = 0m;
        foreach (var sepetUrunu in sepet.Urunler)
        {
            // Re-validate against the CURRENT catalog/stock state — the basket
            // may have been sitting for a while, so its stored FiyatGecmis
            // and the item's continued availability cannot be trusted as-is.
            if (!urunTurler.TryGetValue(sepetUrunu.UrunTurId, out var urunTur))
                throw new InvalidOperationException("Sepetinizdeki bir ürün artık mevcut değil.");

            if (!urunTur.AktifMi || !urunTur.Urun.AktifMi)
                throw new InvalidOperationException($"'{urunTur.Urun.UrunAd}' artık satışta değil.");

            if (sepetUrunu.UrunMiktar > urunTur.StokAded)
                throw new InvalidOperationException($"'{urunTur.Urun.UrunAd}' için yeterli stok bulunmuyor.");

            var birimFiyat = urunTur.Urun.Fiyat + urunTur.FiyatFarki;

            var satir = siparis.UrunEkle(
                urunTur.Id,
                urunTur.UrunId,
                $"{urunTur.Urun.UrunAd} ({urunTur.Ad})",
                urunTur.Urun.Detay,
                urunTur.StokKod,
                sepetUrunu.UrunMiktar,
                birimFiyat,
                indirimOrani: 0m,
                customer.KullaniciId);

            araToplam += satir.ToplamFiyat;
        }

        siparis.ToplamlariGuncelle(araToplam, indirimTutari: 0m, kargoFiyat: 0m);

        context.Siparisler.Add(siparis);
        sepet.DurumuGuncelle((int)SepetDurum.Tamamlanmis, customer.KullaniciId);

        await context.SaveChangesAsync(cancellationToken);
        return siparis.Id;
    }
}
