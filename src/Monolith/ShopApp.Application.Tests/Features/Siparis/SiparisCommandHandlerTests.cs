using Microsoft.EntityFrameworkCore;
using Moq;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Application.Features.Siparis.Commands.CreateSiparis;
using ShopApp.Application.Features.Siparis.Commands.DeleteSiparis;
using ShopApp.Application.Features.Siparis.Commands.UpdateSiparis;
using ShopApp.Application.Tests.TestSupport;
using ShopApp.Domain.Urun.Entities;
using UrunEntity = ShopApp.Domain.Urun.Entities.Urun;
using src.Monolith.ShopApp.Domain.Kullanici;
using src.Monolith.ShopApp.Domain.Sepet.Entities;
using src.Monolith.ShopApp.Domain.Sepet.Enums;
using src.Monolith.ShopApp.Domain.Siparis.Entities;
using src.Monolith.ShopApp.Domain.Siparis.Enums;
using Xunit;

namespace ShopApp.Application.Tests.Features.Siparis;

public class SiparisCommandHandlerTests
{
    private static readonly CurrentCustomer Owner = new(Guid.NewGuid(), Guid.NewGuid());
    private static readonly CurrentCustomer Stranger = new(Guid.NewGuid(), Guid.NewGuid());

    /// <summary>
    /// CreateSiparisCommandHandler requires at least one saved address before
    /// it will convert a basket into an order — tests that exercise the rest
    /// of that handler (stock/variant validation, successful conversion) need
    /// one seeded first so they fail/succeed for the reason they're actually
    /// testing, not because the address requirement short-circuited them.
    /// </summary>
    private static void SeedAddress(TestDbContext context, CurrentCustomer customer)
    {
        context.Adresler.Add(Address.Olustur(customer.MusteriId, ulke: 1, sehir: 34, ilce: 1, mahalle: 1, postaKodu: 34000, adresBilgisi: "Test Mah.", customer.KullaniciId));
        context.SaveChanges();
    }

    private static (UrunEntity urun, UrunTur tur) SeedActiveVariant(TestDbContext context, decimal fiyat, decimal fiyatFarki, int stok)
    {
        var kategori = new Kategori { KategoriAd = "Test Kategori", AktifMi = true };
        context.Kategori.Add(kategori);

        var urun = new UrunEntity
        {
            KategoriId = kategori.Id,
            UrunAd = "Test Ürün",
            MarkaAd = "Marka",
            Fiyat = fiyat,
            GecmisFiyat = fiyat,
            AktifMi = true,
        };
        context.Urun.Add(urun);

        var tur = new UrunTur
        {
            UrunId = urun.Id,
            Ad = "M / Siyah",
            StokAded = stok,
            StokKod = "SK-1",
            FiyatFarki = fiyatFarki,
            AktifMi = true,
        };
        context.UrunTur.Add(tur);
        context.SaveChanges();

        return (urun, tur);
    }

    [Fact]
    public async Task Create_TransfersActiveCartItems_IntoSiparisUrunleri_AndClosesCart()
    {
        using var context = TestDbContext.Create();
        var (urun, tur) = SeedActiveVariant(context, fiyat: 1000m, fiyatFarki: 100m, stok: 5);
        SeedAddress(context, Owner);

        var sepet = SepetEntity.Olustur(Owner.MusteriId, Owner.KullaniciId);
        sepet.UrunEkle(tur.Id, 2, fiyatGecmis: 1m, Owner.KullaniciId); // stale/attacker-supplied price — must be ignored
        context.Sepetler.Add(sepet);
        await context.SaveChangesAsync();

        var handler = new CreateSiparisCommandHandler(context, CustomerContextFactory.For(Owner).Object);
        var siparisId = await handler.Handle(new CreateSiparisCommand(), CancellationToken.None);

        var siparis = await context.Siparisler.Include(s => s.Urunler).FirstAsync(s => s.Id == siparisId);
        Assert.Single(siparis.Urunler);
        var satir = siparis.Urunler.First();
        Assert.Equal(tur.Id, satir.UrunTurId);
        Assert.Equal(urun.Id, satir.UrunId);
        Assert.Equal(1100m, satir.UrunBirimFiyat); // Urun.Fiyat + UrunTur.FiyatFarki, never the basket's stale price
        Assert.Equal(2200m, satir.ToplamFiyat);
        Assert.Equal(2200m, siparis.ToplamFiyat);

        var kapatilanSepet = await context.Sepetler.FindAsync(sepet.Id);
        Assert.Equal((int)SepetDurum.Tamamlanmis, kapatilanSepet!.DurumId);
    }

    [Fact]
    public async Task Create_Throws_WhenNoActiveCartExists()
    {
        using var context = TestDbContext.Create();
        var handler = new CreateSiparisCommandHandler(context, CustomerContextFactory.For(Owner).Object);

        await Assert.ThrowsAsync<InvalidOperationException>(() =>
            handler.Handle(new CreateSiparisCommand(), CancellationToken.None));
    }

    [Fact]
    public async Task Create_Throws_WhenActiveCartIsEmpty()
    {
        using var context = TestDbContext.Create();
        context.Sepetler.Add(SepetEntity.Olustur(Owner.MusteriId, Owner.KullaniciId));
        await context.SaveChangesAsync();

        var handler = new CreateSiparisCommandHandler(context, CustomerContextFactory.For(Owner).Object);

        await Assert.ThrowsAsync<InvalidOperationException>(() =>
            handler.Handle(new CreateSiparisCommand(), CancellationToken.None));
    }

    [Fact]
    public async Task Create_Throws_WhenCartItemExceedsCurrentStock()
    {
        using var context = TestDbContext.Create();
        var (_, tur) = SeedActiveVariant(context, fiyat: 500m, fiyatFarki: 0m, stok: 1);
        SeedAddress(context, Owner);

        var sepet = SepetEntity.Olustur(Owner.MusteriId, Owner.KullaniciId);
        sepet.UrunEkle(tur.Id, 5, fiyatGecmis: 500m, Owner.KullaniciId); // more than the 1 unit in stock
        context.Sepetler.Add(sepet);
        await context.SaveChangesAsync();

        var handler = new CreateSiparisCommandHandler(context, CustomerContextFactory.For(Owner).Object);

        await Assert.ThrowsAsync<InvalidOperationException>(() =>
            handler.Handle(new CreateSiparisCommand(), CancellationToken.None));

        Assert.Empty(context.Siparisler);
    }

    [Fact]
    public async Task Create_Throws_WhenVariantNoLongerActive()
    {
        using var context = TestDbContext.Create();
        var (_, tur) = SeedActiveVariant(context, fiyat: 500m, fiyatFarki: 0m, stok: 5);
        tur.AktifMi = false;
        SeedAddress(context, Owner);

        var sepet = SepetEntity.Olustur(Owner.MusteriId, Owner.KullaniciId);
        sepet.UrunEkle(tur.Id, 1, fiyatGecmis: 500m, Owner.KullaniciId);
        context.Sepetler.Add(sepet);
        await context.SaveChangesAsync();

        var handler = new CreateSiparisCommandHandler(context, CustomerContextFactory.For(Owner).Object);

        await Assert.ThrowsAsync<InvalidOperationException>(() =>
            handler.Handle(new CreateSiparisCommand(), CancellationToken.None));
    }

    [Fact]
    public async Task Create_Throws_WhenCustomerHasNoSavedAddress()
    {
        // Frontend validation (CartPage's address-required prompt) is UX only
        // — this proves POSTing directly to /api/siparis can't skip the rule
        // just because it has a non-empty, otherwise-valid basket.
        using var context = TestDbContext.Create();
        var (_, tur) = SeedActiveVariant(context, fiyat: 500m, fiyatFarki: 0m, stok: 5);

        var sepet = SepetEntity.Olustur(Owner.MusteriId, Owner.KullaniciId);
        sepet.UrunEkle(tur.Id, 1, fiyatGecmis: 500m, Owner.KullaniciId);
        context.Sepetler.Add(sepet);
        await context.SaveChangesAsync();

        var handler = new CreateSiparisCommandHandler(context, CustomerContextFactory.For(Owner).Object);

        var exception = await Assert.ThrowsAsync<InvalidOperationException>(() =>
            handler.Handle(new CreateSiparisCommand(), CancellationToken.None));

        Assert.Equal("Sipariş oluşturabilmek için önce teslimat adresi eklemelisiniz.", exception.Message);
        Assert.Empty(context.Siparisler);

        var basket = await context.Sepetler.FindAsync(sepet.Id);
        Assert.Equal((int)SepetDurum.Aktif, basket!.DurumId); // basket must stay open, not be silently closed
    }

    [Fact]
    public async Task Create_Succeeds_WhenCustomerHasAtLeastOneSavedAddress()
    {
        using var context = TestDbContext.Create();
        var (_, tur) = SeedActiveVariant(context, fiyat: 500m, fiyatFarki: 0m, stok: 5);
        SeedAddress(context, Owner);

        var sepet = SepetEntity.Olustur(Owner.MusteriId, Owner.KullaniciId);
        sepet.UrunEkle(tur.Id, 1, fiyatGecmis: 500m, Owner.KullaniciId);
        context.Sepetler.Add(sepet);
        await context.SaveChangesAsync();

        var handler = new CreateSiparisCommandHandler(context, CustomerContextFactory.For(Owner).Object);
        var siparisId = await handler.Handle(new CreateSiparisCommand(), CancellationToken.None);

        Assert.NotEqual(Guid.Empty, siparisId);
        Assert.Single(context.Siparisler);
    }

    [Fact]
    public async Task Update_Throws_WhenOrderBelongsToAnotherCustomer()
    {
        var siparis = SiparisEntity.Olustur(Owner.MusteriId, "SIP-TEST-1", Owner.KullaniciId);
        var repository = new Mock<ISiparisRepository>();
        repository.Setup(r => r.GetByIdAsync(siparis.Id, It.IsAny<CancellationToken>())).ReturnsAsync(siparis);

        var handler = new UpdateSiparisCommandHandler(repository.Object, CustomerContextFactory.For(Stranger).Object);

        await Assert.ThrowsAsync<KeyNotFoundException>(() =>
            handler.Handle(new UpdateSiparisCommand(siparis.Id, (int)SiparisDurum.IptalEdildi), CancellationToken.None));

        repository.Verify(r => r.UpdateAsync(It.IsAny<SiparisEntity>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Fact]
    public async Task Update_Throws_WhenOrderDoesNotExist()
    {
        var repository = new Mock<ISiparisRepository>();
        repository.Setup(r => r.GetByIdAsync(It.IsAny<Guid>(), It.IsAny<CancellationToken>())).ReturnsAsync((SiparisEntity?)null);

        var handler = new UpdateSiparisCommandHandler(repository.Object, CustomerContextFactory.For(Owner).Object);

        await Assert.ThrowsAsync<KeyNotFoundException>(() =>
            handler.Handle(new UpdateSiparisCommand(Guid.NewGuid(), (int)SiparisDurum.Odenmis), CancellationToken.None));
    }

    [Fact]
    public async Task Update_Succeeds_WhenOrderBelongsToCaller()
    {
        var siparis = SiparisEntity.Olustur(Owner.MusteriId, "SIP-TEST-2", Owner.KullaniciId);
        var repository = new Mock<ISiparisRepository>();
        repository.Setup(r => r.GetByIdAsync(siparis.Id, It.IsAny<CancellationToken>())).ReturnsAsync(siparis);

        var handler = new UpdateSiparisCommandHandler(repository.Object, CustomerContextFactory.For(Owner).Object);

        await handler.Handle(new UpdateSiparisCommand(siparis.Id, (int)SiparisDurum.IptalEdildi), CancellationToken.None);

        Assert.Equal((int)SiparisDurum.IptalEdildi, siparis.DurumId);
        repository.Verify(r => r.UpdateAsync(siparis, It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task Delete_Throws_WhenOrderBelongsToAnotherCustomer()
    {
        var siparis = SiparisEntity.Olustur(Owner.MusteriId, "SIP-TEST-3", Owner.KullaniciId);
        var repository = new Mock<ISiparisRepository>();
        repository.Setup(r => r.GetByIdAsync(siparis.Id, It.IsAny<CancellationToken>())).ReturnsAsync(siparis);

        var handler = new DeleteSiparisCommandHandler(repository.Object, CustomerContextFactory.For(Stranger).Object);

        await Assert.ThrowsAsync<KeyNotFoundException>(() =>
            handler.Handle(new DeleteSiparisCommand(siparis.Id), CancellationToken.None));

        repository.Verify(r => r.DeleteAsync(It.IsAny<SiparisEntity>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Fact]
    public async Task Delete_Succeeds_WhenOrderBelongsToCaller()
    {
        var siparis = SiparisEntity.Olustur(Owner.MusteriId, "SIP-TEST-4", Owner.KullaniciId);
        var repository = new Mock<ISiparisRepository>();
        repository.Setup(r => r.GetByIdAsync(siparis.Id, It.IsAny<CancellationToken>())).ReturnsAsync(siparis);

        var handler = new DeleteSiparisCommandHandler(repository.Object, CustomerContextFactory.For(Owner).Object);

        await handler.Handle(new DeleteSiparisCommand(siparis.Id), CancellationToken.None);

        repository.Verify(r => r.DeleteAsync(siparis, It.IsAny<CancellationToken>()), Times.Once);
    }
}
