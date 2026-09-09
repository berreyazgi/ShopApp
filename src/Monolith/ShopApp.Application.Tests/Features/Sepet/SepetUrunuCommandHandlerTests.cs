using Moq;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Application.Features.Sepet.Commands.CreateSepetUrunu;
using ShopApp.Application.Features.Sepet.Commands.DeleteSepetUrunu;
using ShopApp.Application.Features.Sepet.Commands.UpdateSepetUrunu;
using ShopApp.Application.Tests.TestSupport;
using ShopApp.Domain.Urun.Entities;
using UrunEntity = ShopApp.Domain.Urun.Entities.Urun;
using src.Monolith.ShopApp.Domain.Sepet.Entities;
using Xunit;

namespace ShopApp.Application.Tests.Features.Sepet;

public class SepetUrunuCommandHandlerTests
{
    private static readonly CurrentCustomer Owner = new(Guid.NewGuid(), Guid.NewGuid());
    private static readonly CurrentCustomer Stranger = new(Guid.NewGuid(), Guid.NewGuid());

    private static SepetEntity CreateSepetWithItem(CurrentCustomer owner, out SepetUrunu urun)
    {
        var sepet = SepetEntity.Olustur(owner.MusteriId, owner.KullaniciId);
        urun = sepet.UrunEkle(Guid.NewGuid(), 2, 15m, owner.KullaniciId);
        return sepet;
    }

    private static UrunTur SeedActiveVariant(TestDbContext context, decimal fiyat, decimal fiyatFarki, int stok, bool aktifMi = true, bool urunAktifMi = true)
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
            AktifMi = urunAktifMi,
        };
        context.Urun.Add(urun);

        var tur = new UrunTur
        {
            UrunId = urun.Id,
            Ad = "M / Siyah",
            StokAded = stok,
            StokKod = "SK-1",
            FiyatFarki = fiyatFarki,
            AktifMi = aktifMi,
        };
        context.UrunTur.Add(tur);
        context.SaveChanges();

        return tur;
    }

    [Fact]
    public async Task Create_Throws_WhenParentCartBelongsToAnotherCustomer()
    {
        using var context = TestDbContext.Create();
        var tur = SeedActiveVariant(context, fiyat: 1000m, fiyatFarki: 0m, stok: 5);
        var sepet = SepetEntity.Olustur(Owner.MusteriId, Owner.KullaniciId);

        var sepetRepository = new Mock<ISepetRepository>();
        sepetRepository.Setup(r => r.GetByIdAsync(sepet.Id, It.IsAny<CancellationToken>())).ReturnsAsync(sepet);

        var handler = new CreateSepetUrunuCommandHandler(sepetRepository.Object, context, CustomerContextFactory.For(Stranger).Object);

        await Assert.ThrowsAsync<KeyNotFoundException>(() =>
            handler.Handle(new CreateSepetUrunuCommand(sepet.Id, tur.Id, 1), CancellationToken.None));

        sepetRepository.Verify(r => r.UpdateAsync(It.IsAny<SepetEntity>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Fact]
    public async Task Create_Succeeds_WhenParentCartBelongsToCaller_AndResolvesPriceServerSide()
    {
        using var context = TestDbContext.Create();
        var tur = SeedActiveVariant(context, fiyat: 1000m, fiyatFarki: 100m, stok: 5);
        var sepet = SepetEntity.Olustur(Owner.MusteriId, Owner.KullaniciId);

        var sepetRepository = new Mock<ISepetRepository>();
        sepetRepository.Setup(r => r.GetByIdAsync(sepet.Id, It.IsAny<CancellationToken>())).ReturnsAsync(sepet);

        var handler = new CreateSepetUrunuCommandHandler(sepetRepository.Object, context, CustomerContextFactory.For(Owner).Object);

        // The command carries no price at all — only SepetId/UrunTurId/UrunMiktar.
        var id = await handler.Handle(new CreateSepetUrunuCommand(sepet.Id, tur.Id, 2), CancellationToken.None);

        Assert.NotEqual(Guid.Empty, id);
        var eklenen = Assert.Single(sepet.Urunler);
        Assert.Equal(id, eklenen.Id);
        // Urun.Fiyat (1000) + UrunTur.FiyatFarki (100) — never client-supplied.
        Assert.Equal(1100m, eklenen.FiyatGecmis);
        sepetRepository.Verify(r => r.UpdateAsync(sepet, It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task Create_MergesQuantity_WhenSameVariantAlreadyInCart()
    {
        using var context = TestDbContext.Create();
        var tur = SeedActiveVariant(context, fiyat: 500m, fiyatFarki: 0m, stok: 10);
        var sepet = SepetEntity.Olustur(Owner.MusteriId, Owner.KullaniciId);
        sepet.UrunEkle(tur.Id, 1, 500m, Owner.KullaniciId); // already 1 unit in the cart

        var sepetRepository = new Mock<ISepetRepository>();
        sepetRepository.Setup(r => r.GetByIdAsync(sepet.Id, It.IsAny<CancellationToken>())).ReturnsAsync(sepet);

        var handler = new CreateSepetUrunuCommandHandler(sepetRepository.Object, context, CustomerContextFactory.For(Owner).Object);
        await handler.Handle(new CreateSepetUrunuCommand(sepet.Id, tur.Id, 2), CancellationToken.None);

        var line = Assert.Single(sepet.Urunler); // one line, not two
        Assert.Equal(3, line.UrunMiktar);
    }

    [Fact]
    public async Task Create_KeepsSeparateLines_ForDifferentVariants()
    {
        using var context = TestDbContext.Create();
        var turA = SeedActiveVariant(context, fiyat: 500m, fiyatFarki: 0m, stok: 10);
        var turB = SeedActiveVariant(context, fiyat: 600m, fiyatFarki: 0m, stok: 10);
        var sepet = SepetEntity.Olustur(Owner.MusteriId, Owner.KullaniciId);

        var sepetRepository = new Mock<ISepetRepository>();
        sepetRepository.Setup(r => r.GetByIdAsync(sepet.Id, It.IsAny<CancellationToken>())).ReturnsAsync(sepet);

        var handler = new CreateSepetUrunuCommandHandler(sepetRepository.Object, context, CustomerContextFactory.For(Owner).Object);
        await handler.Handle(new CreateSepetUrunuCommand(sepet.Id, turA.Id, 1), CancellationToken.None);
        await handler.Handle(new CreateSepetUrunuCommand(sepet.Id, turB.Id, 1), CancellationToken.None);

        Assert.Equal(2, sepet.Urunler.Count);
    }

    [Fact]
    public async Task Create_Throws_WhenQuantityExceedsStock()
    {
        using var context = TestDbContext.Create();
        var tur = SeedActiveVariant(context, fiyat: 500m, fiyatFarki: 0m, stok: 2);
        var sepet = SepetEntity.Olustur(Owner.MusteriId, Owner.KullaniciId);

        var sepetRepository = new Mock<ISepetRepository>();
        sepetRepository.Setup(r => r.GetByIdAsync(sepet.Id, It.IsAny<CancellationToken>())).ReturnsAsync(sepet);

        var handler = new CreateSepetUrunuCommandHandler(sepetRepository.Object, context, CustomerContextFactory.For(Owner).Object);

        await Assert.ThrowsAsync<InvalidOperationException>(() =>
            handler.Handle(new CreateSepetUrunuCommand(sepet.Id, tur.Id, 3), CancellationToken.None));
    }

    [Fact]
    public async Task Create_Throws_WhenCombinedQuantityWithExistingLineExceedsStock()
    {
        using var context = TestDbContext.Create();
        var tur = SeedActiveVariant(context, fiyat: 500m, fiyatFarki: 0m, stok: 3);
        var sepet = SepetEntity.Olustur(Owner.MusteriId, Owner.KullaniciId);
        sepet.UrunEkle(tur.Id, 2, 500m, Owner.KullaniciId); // 2 already in cart, only 1 more fits

        var sepetRepository = new Mock<ISepetRepository>();
        sepetRepository.Setup(r => r.GetByIdAsync(sepet.Id, It.IsAny<CancellationToken>())).ReturnsAsync(sepet);

        var handler = new CreateSepetUrunuCommandHandler(sepetRepository.Object, context, CustomerContextFactory.For(Owner).Object);

        await Assert.ThrowsAsync<InvalidOperationException>(() =>
            handler.Handle(new CreateSepetUrunuCommand(sepet.Id, tur.Id, 2), CancellationToken.None));
    }

    [Fact]
    public async Task Create_Throws_WhenVariantIsInactive()
    {
        using var context = TestDbContext.Create();
        var tur = SeedActiveVariant(context, fiyat: 500m, fiyatFarki: 0m, stok: 5, aktifMi: false);
        var sepet = SepetEntity.Olustur(Owner.MusteriId, Owner.KullaniciId);

        var sepetRepository = new Mock<ISepetRepository>();
        sepetRepository.Setup(r => r.GetByIdAsync(sepet.Id, It.IsAny<CancellationToken>())).ReturnsAsync(sepet);

        var handler = new CreateSepetUrunuCommandHandler(sepetRepository.Object, context, CustomerContextFactory.For(Owner).Object);

        await Assert.ThrowsAsync<InvalidOperationException>(() =>
            handler.Handle(new CreateSepetUrunuCommand(sepet.Id, tur.Id, 1), CancellationToken.None));
    }

    [Fact]
    public async Task Create_Throws_WhenParentUrunIsInactive()
    {
        using var context = TestDbContext.Create();
        var tur = SeedActiveVariant(context, fiyat: 500m, fiyatFarki: 0m, stok: 5, urunAktifMi: false);
        var sepet = SepetEntity.Olustur(Owner.MusteriId, Owner.KullaniciId);

        var sepetRepository = new Mock<ISepetRepository>();
        sepetRepository.Setup(r => r.GetByIdAsync(sepet.Id, It.IsAny<CancellationToken>())).ReturnsAsync(sepet);

        var handler = new CreateSepetUrunuCommandHandler(sepetRepository.Object, context, CustomerContextFactory.For(Owner).Object);

        await Assert.ThrowsAsync<InvalidOperationException>(() =>
            handler.Handle(new CreateSepetUrunuCommand(sepet.Id, tur.Id, 1), CancellationToken.None));
    }

    [Fact]
    public async Task Create_Throws_WhenVariantDoesNotExist()
    {
        using var context = TestDbContext.Create();
        var sepet = SepetEntity.Olustur(Owner.MusteriId, Owner.KullaniciId);

        var sepetRepository = new Mock<ISepetRepository>();
        sepetRepository.Setup(r => r.GetByIdAsync(sepet.Id, It.IsAny<CancellationToken>())).ReturnsAsync(sepet);

        var handler = new CreateSepetUrunuCommandHandler(sepetRepository.Object, context, CustomerContextFactory.For(Owner).Object);

        await Assert.ThrowsAsync<KeyNotFoundException>(() =>
            handler.Handle(new CreateSepetUrunuCommand(sepet.Id, Guid.NewGuid(), 1), CancellationToken.None));
    }

    [Fact]
    public async Task Update_Throws_WhenItemBelongsToAnotherCustomersCart()
    {
        var sepet = CreateSepetWithItem(Owner, out var urun);
        var repository = new Mock<ISepetRepository>();
        repository.Setup(r => r.GetByIdAsync(sepet.Id, It.IsAny<CancellationToken>())).ReturnsAsync(sepet);

        var handler = new UpdateSepetUrunuCommandHandler(repository.Object, CustomerContextFactory.For(Stranger).Object);

        await Assert.ThrowsAsync<KeyNotFoundException>(() =>
            handler.Handle(new UpdateSepetUrunuCommand(sepet.Id, urun.Id, 5), CancellationToken.None));

        repository.Verify(r => r.UpdateAsync(It.IsAny<SepetEntity>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Fact]
    public async Task Update_Succeeds_WhenItemBelongsToCallersCart()
    {
        var sepet = CreateSepetWithItem(Owner, out var urun);
        var repository = new Mock<ISepetRepository>();
        repository.Setup(r => r.GetByIdAsync(sepet.Id, It.IsAny<CancellationToken>())).ReturnsAsync(sepet);

        var handler = new UpdateSepetUrunuCommandHandler(repository.Object, CustomerContextFactory.For(Owner).Object);

        await handler.Handle(new UpdateSepetUrunuCommand(sepet.Id, urun.Id, 5), CancellationToken.None);

        Assert.Equal(5, urun.UrunMiktar);
        repository.Verify(r => r.UpdateAsync(sepet, It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task Delete_Throws_WhenItemBelongsToAnotherCustomersCart()
    {
        var sepet = CreateSepetWithItem(Owner, out var urun);
        var repository = new Mock<ISepetRepository>();
        repository.Setup(r => r.GetByIdAsync(sepet.Id, It.IsAny<CancellationToken>())).ReturnsAsync(sepet);

        var handler = new DeleteSepetUrunuCommandHandler(repository.Object, CustomerContextFactory.For(Stranger).Object);

        await Assert.ThrowsAsync<KeyNotFoundException>(() =>
            handler.Handle(new DeleteSepetUrunuCommand(sepet.Id, urun.Id), CancellationToken.None));

        repository.Verify(r => r.UpdateAsync(It.IsAny<SepetEntity>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Fact]
    public async Task Delete_Succeeds_WhenItemBelongsToCallersCart()
    {
        var sepet = CreateSepetWithItem(Owner, out var urun);
        var repository = new Mock<ISepetRepository>();
        repository.Setup(r => r.GetByIdAsync(sepet.Id, It.IsAny<CancellationToken>())).ReturnsAsync(sepet);

        var handler = new DeleteSepetUrunuCommandHandler(repository.Object, CustomerContextFactory.For(Owner).Object);

        await handler.Handle(new DeleteSepetUrunuCommand(sepet.Id, urun.Id), CancellationToken.None);

        Assert.DoesNotContain(sepet.Urunler, u => u.Id == urun.Id);
        repository.Verify(r => r.UpdateAsync(sepet, It.IsAny<CancellationToken>()), Times.Once);
    }
}
