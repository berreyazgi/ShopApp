using ShopApp.Application.Features.Urun.Queries;
using ShopApp.Application.Tests.TestSupport;
using ShopApp.Domain.Urun.Entities;
using UrunEntity = ShopApp.Domain.Urun.Entities.Urun;
using Xunit;

namespace ShopApp.Application.Tests.Features.Urun;

/// <summary>
/// Covers the admin product list projection's ToplamStok — the sum of a
/// product's persisted UrunTur.StokAded rows, never an arbitrary single
/// variant's value, and never a stand-in for genuinely missing data.
/// </summary>
public class GetAdminUrunlerHandlerTests
{
    private static Kategori SeedKategori(TestDbContext context)
    {
        var kategori = new Kategori { KategoriAd = "Giyim" };
        context.Kategori.Add(kategori);
        context.SaveChanges();
        return kategori;
    }

    [Fact]
    public async Task GetAdminUrunler_IncludesActiveAndPassiveProducts()
    {
        using var context = TestDbContext.Create();
        var kategori = SeedKategori(context);

        var active = new UrunEntity { KategoriId = kategori.Id, UrunAd = "Aktif", MarkaAd = "Marka", Fiyat = 100m, AktifMi = true };
        var passive = new UrunEntity { KategoriId = kategori.Id, UrunAd = "Pasif", MarkaAd = "Marka", Fiyat = 200m, AktifMi = false };
        context.Urun.AddRange(active, passive);
        await context.SaveChangesAsync();

        var handler = new GetAdminUrunler.GetAdminUrunlerQueryHandler(context);
        var result = await handler.Handle(new GetAdminUrunler.GetAdminUrunlerQuery(), CancellationToken.None);

        Assert.Contains(result, x => x.Id == active.Id);
        Assert.Contains(result, x => x.Id == passive.Id);
    }

    [Fact]
    public async Task GetAdminUrunler_ToplamStok_SumsAllVariantsOfTheProduct()
    {
        using var context = TestDbContext.Create();
        var kategori = SeedKategori(context);

        var urun = new UrunEntity { KategoriId = kategori.Id, UrunAd = "Tişört", MarkaAd = "Marka", Fiyat = 100m, AktifMi = true };
        context.Urun.Add(urun);
        await context.SaveChangesAsync();

        context.UrunTur.AddRange(
            new UrunTur { UrunId = urun.Id, Ad = "S", StokKod = "SK-S", StokAded = 3 },
            new UrunTur { UrunId = urun.Id, Ad = "M", StokKod = "SK-M", StokAded = 4 });
        await context.SaveChangesAsync();

        var handler = new GetAdminUrunler.GetAdminUrunlerQueryHandler(context);
        var result = await handler.Handle(new GetAdminUrunler.GetAdminUrunlerQuery(), CancellationToken.None);

        Assert.Equal(7, result.Single(x => x.Id == urun.Id).ToplamStok);
    }

    [Fact]
    public async Task GetAdminUrunler_ToplamStok_IsZero_WhenProductHasNoVariants()
    {
        using var context = TestDbContext.Create();
        var kategori = SeedKategori(context);

        var urun = new UrunEntity { KategoriId = kategori.Id, UrunAd = "Varyantsız", MarkaAd = "Marka", Fiyat = 50m, AktifMi = true };
        context.Urun.Add(urun);
        await context.SaveChangesAsync();

        var handler = new GetAdminUrunler.GetAdminUrunlerQueryHandler(context);
        var result = await handler.Handle(new GetAdminUrunler.GetAdminUrunlerQuery(), CancellationToken.None);

        Assert.Equal(0, result.Single(x => x.Id == urun.Id).ToplamStok);
    }

    [Fact]
    public async Task GetAdminUrunler_FiltersByKategoriId()
    {
        using var context = TestDbContext.Create();
        var kategoriA = SeedKategori(context);
        var kategoriB = new Kategori { KategoriAd = "Aksesuar" };
        context.Kategori.Add(kategoriB);
        await context.SaveChangesAsync();

        var urunA = new UrunEntity { KategoriId = kategoriA.Id, UrunAd = "A", MarkaAd = "Marka", Fiyat = 10m, AktifMi = true };
        var urunB = new UrunEntity { KategoriId = kategoriB.Id, UrunAd = "B", MarkaAd = "Marka", Fiyat = 20m, AktifMi = true };
        context.Urun.AddRange(urunA, urunB);
        await context.SaveChangesAsync();

        var handler = new GetAdminUrunler.GetAdminUrunlerQueryHandler(context);
        var result = await handler.Handle(new GetAdminUrunler.GetAdminUrunlerQuery(kategoriA.Id), CancellationToken.None);

        Assert.Single(result);
        Assert.Equal(urunA.Id, result[0].Id);
    }
}
