using Microsoft.EntityFrameworkCore;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Application.Features.Urun.Commands.UpdateUrun;
using ShopApp.Application.Features.Urun.Commands.UpdateUrunTur;
using ShopApp.Application.Tests.TestSupport;
using ShopApp.Domain.Urun.Entities;
using ShopApp.Infrastructure.Persistence.Context;
using ShopApp.Infrastructure.Persistence.Repositories;
using UrunEntity = ShopApp.Domain.Urun.Entities.Urun;
using Xunit;

namespace ShopApp.Application.Tests.Features.Urun;

/// <summary>
/// Covers admin edit workflow correctness: toggling AktifMi, and making sure a
/// root-product update or a variant SKU/stock update never erases or duplicates
/// the other side of the Urun/UrunTur relationship.
/// </summary>
public class UrunEditPreservationTests
{
    private static readonly CurrentCustomer Admin = new(Guid.NewGuid(), Guid.NewGuid());

    private static ShopAppDbContext CreateContext()
    {
        var options = new DbContextOptionsBuilder<ShopAppDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;
        return new ShopAppDbContext(options);
    }

    private static (UrunEntity urun, UrunTur tur) SeedProductWithVariant(ShopAppDbContext context)
    {
        var kategori = new Kategori { KategoriAd = "Giyim" };
        context.Kategori.Add(kategori);

        var urun = new UrunEntity
        {
            KategoriId = kategori.Id,
            UrunAd = "Test Ürün",
            MarkaAd = "Marka",
            Fiyat = 500m,
            AktifMi = true,
        };
        context.Urun.Add(urun);

        var tur = new UrunTur
        {
            UrunId = urun.Id,
            Ad = "Standart",
            StokKod = "ABC-100",
            StokAded = 32,
            FiyatFarki = 0m,
            AktifMi = true,
        };
        context.UrunTur.Add(tur);
        context.SaveChanges();

        return (urun, tur);
    }

    [Fact]
    public async Task UpdateUrun_TogglesAktifMi_TrueToFalse()
    {
        using var context = CreateContext();
        var (urun, _) = SeedProductWithVariant(context);

        var urunRepo = new GenericUrunRepository<UrunEntity>(context);
        var kategoriRepo = new GenericUrunRepository<Kategori>(context);
        var handler = new UpdateUrunCommandHandler(urunRepo, kategoriRepo, CustomerContextFactory.For(Admin).Object);

        var command = new UpdateUrunCommand(urun.Id, urun.KategoriId, urun.UrunAd, urun.Detay, urun.Fiyat, urun.MarkaAd, urun.GecmisFiyat, urun.GorselUrl, AktifMi: false);
        await handler.Handle(command, CancellationToken.None);

        var reloaded = await context.Urun.AsNoTracking().FirstAsync(x => x.Id == urun.Id);
        Assert.False(reloaded.AktifMi);
    }

    [Fact]
    public async Task UpdateUrun_TogglesAktifMi_FalseToTrue()
    {
        using var context = CreateContext();
        var (urun, _) = SeedProductWithVariant(context);
        urun.AktifMi = false;
        context.Urun.Update(urun);
        context.SaveChanges();

        var urunRepo = new GenericUrunRepository<UrunEntity>(context);
        var kategoriRepo = new GenericUrunRepository<Kategori>(context);
        var handler = new UpdateUrunCommandHandler(urunRepo, kategoriRepo, CustomerContextFactory.For(Admin).Object);

        var command = new UpdateUrunCommand(urun.Id, urun.KategoriId, urun.UrunAd, urun.Detay, urun.Fiyat, urun.MarkaAd, urun.GecmisFiyat, urun.GorselUrl, AktifMi: true);
        await handler.Handle(command, CancellationToken.None);

        var reloaded = await context.Urun.AsNoTracking().FirstAsync(x => x.Id == urun.Id);
        Assert.True(reloaded.AktifMi);
    }

    [Fact]
    public async Task UpdateUrun_ChangingOnlyPrice_DoesNotAlterExistingUrunTur()
    {
        using var context = CreateContext();
        var (urun, tur) = SeedProductWithVariant(context);

        var urunRepo = new GenericUrunRepository<UrunEntity>(context);
        var kategoriRepo = new GenericUrunRepository<Kategori>(context);
        var handler = new UpdateUrunCommandHandler(urunRepo, kategoriRepo, CustomerContextFactory.For(Admin).Object);

        var command = new UpdateUrunCommand(urun.Id, urun.KategoriId, urun.UrunAd, urun.Detay, Fiyat: 550m, urun.MarkaAd, urun.GecmisFiyat, urun.GorselUrl, urun.AktifMi);
        await handler.Handle(command, CancellationToken.None);

        var reloadedUrun = await context.Urun.AsNoTracking().FirstAsync(x => x.Id == urun.Id);
        Assert.Equal(550m, reloadedUrun.Fiyat);

        var reloadedTur = await context.UrunTur.AsNoTracking().FirstAsync(x => x.Id == tur.Id);
        Assert.Equal("ABC-100", reloadedTur.StokKod);
        Assert.Equal(32, reloadedTur.StokAded);
        Assert.Single(await context.UrunTur.Where(x => x.UrunId == urun.Id).ToListAsync());
    }

    [Fact]
    public async Task UpdateUrunTur_ChangingStokKod_PreservesStokAded_AndDoesNotCreateDuplicateVariant()
    {
        using var context = CreateContext();
        var (urun, tur) = SeedProductWithVariant(context);

        var urunTurRepo = new GenericUrunRepository<UrunTur>(context);
        var urunRepo = new GenericUrunRepository<UrunEntity>(context);
        var handler = new UpdateUrunTurCommandHandler(urunTurRepo, urunRepo, CustomerContextFactory.For(Admin).Object);

        var command = new UpdateUrunTurCommand(urun.Id, tur.Id, tur.Ad, tur.StokAded, StokKod: "ABC-101", tur.FiyatFarki, tur.AktifMi);
        await handler.Handle(command, CancellationToken.None);

        var reloaded = await context.UrunTur.AsNoTracking().FirstAsync(x => x.Id == tur.Id);
        Assert.Equal("ABC-101", reloaded.StokKod);
        Assert.Equal(32, reloaded.StokAded);

        Assert.Single(await context.UrunTur.Where(x => x.UrunId == urun.Id).ToListAsync());
    }
}
