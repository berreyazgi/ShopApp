using ShopApp.Application.Features.Urun.Queries;
using ShopApp.Application.Tests.TestSupport;
using ShopApp.Domain.Urun.Entities;
using UrunEntity = ShopApp.Domain.Urun.Entities.Urun;
using Xunit;

namespace ShopApp.Application.Tests.Features.Urun;

/// <summary>
/// Covers the customer/admin product-visibility split: the public GetUrunler /
/// GetUrun queries must hide passive (AktifMi = false) products, while the
/// admin-facing IncludePassive:true calls (used by AdminUrunController) must
/// still return them.
/// </summary>
public class UrunListingVisibilityTests
{
    private static (Kategori kategori, UrunEntity active, UrunEntity passive) SeedActiveAndPassiveProduct(TestDbContext context)
    {
        var kategori = new Kategori { KategoriAd = "Ayakkabı" };
        context.Kategori.Add(kategori);

        var active = new UrunEntity
        {
            KategoriId = kategori.Id,
            UrunAd = "Aktif Ürün",
            MarkaAd = "Marka",
            Fiyat = 100m,
            AktifMi = true,
        };
        var passive = new UrunEntity
        {
            KategoriId = kategori.Id,
            UrunAd = "Pasif Ürün",
            MarkaAd = "Marka",
            Fiyat = 200m,
            AktifMi = false,
        };
        context.Urun.AddRange(active, passive);
        context.SaveChanges();

        return (kategori, active, passive);
    }

    [Fact]
    public async Task GetUrunlerQuery_PublicDefault_ExcludesPassiveProducts()
    {
        using var context = TestDbContext.Create();
        var (_, active, passive) = SeedActiveAndPassiveProduct(context);

        var handler = new GetUrunler.GetUrunlerQueryHandler(context, MapperFactory.Create());
        var result = await handler.Handle(new GetUrunler.GetUrunlerQuery(), CancellationToken.None);

        Assert.Contains(result, x => x.Id == active.Id);
        Assert.DoesNotContain(result, x => x.Id == passive.Id);
    }

    [Fact]
    public async Task GetUrunlerQuery_PublicDefault_ExcludesPassiveProducts_EvenWhenFilteredByCategory()
    {
        using var context = TestDbContext.Create();
        var (kategori, active, passive) = SeedActiveAndPassiveProduct(context);

        var handler = new GetUrunler.GetUrunlerQueryHandler(context, MapperFactory.Create());
        var result = await handler.Handle(new GetUrunler.GetUrunlerQuery(kategori.Id), CancellationToken.None);

        Assert.Contains(result, x => x.Id == active.Id);
        Assert.DoesNotContain(result, x => x.Id == passive.Id);
    }

    [Fact]
    public async Task GetUrunlerQuery_AdminIncludePassive_ReturnsActiveAndPassiveProducts()
    {
        using var context = TestDbContext.Create();
        var (_, active, passive) = SeedActiveAndPassiveProduct(context);

        var handler = new GetUrunler.GetUrunlerQueryHandler(context, MapperFactory.Create());
        var result = await handler.Handle(new GetUrunler.GetUrunlerQuery(IncludePassive: true), CancellationToken.None);

        Assert.Contains(result, x => x.Id == active.Id);
        Assert.Contains(result, x => x.Id == passive.Id);
    }

    [Fact]
    public async Task GetUrunQuery_PublicDefault_ThrowsForPassiveProduct()
    {
        using var context = TestDbContext.Create();
        var (_, _, passive) = SeedActiveAndPassiveProduct(context);

        var handler = new GetUrun.GetUrunQueryHandler(context, MapperFactory.Create());

        await Assert.ThrowsAsync<KeyNotFoundException>(() =>
            handler.Handle(new GetUrun.GetUrunQuery(passive.Id), CancellationToken.None));
    }

    [Fact]
    public async Task GetUrunQuery_AdminIncludePassive_ReturnsPassiveProductDetail()
    {
        using var context = TestDbContext.Create();
        var (_, _, passive) = SeedActiveAndPassiveProduct(context);

        var handler = new GetUrun.GetUrunQueryHandler(context, MapperFactory.Create());
        var result = await handler.Handle(new GetUrun.GetUrunQuery(passive.Id, IncludePassive: true), CancellationToken.None);

        Assert.Equal(passive.Id, result.Id);
        Assert.False(result.AktifMi);
    }

    [Fact]
    public async Task GetUrunQuery_Detail_IncludesUrunTurStokKodAndStokAded()
    {
        using var context = TestDbContext.Create();
        var (kategori, _, _) = SeedActiveAndPassiveProduct(context);

        var urun = new UrunEntity
        {
            KategoriId = kategori.Id,
            UrunAd = "Nike Air Max",
            MarkaAd = "Nike",
            Fiyat = 1000m,
            AktifMi = true,
        };
        context.Urun.Add(urun);
        context.SaveChanges();

        var tur = new UrunTur
        {
            UrunId = urun.Id,
            Ad = "42",
            StokKod = "NIKE-AM-42",
            StokAded = 15,
        };
        context.UrunTur.Add(tur);
        context.SaveChanges();

        var handler = new GetUrun.GetUrunQueryHandler(context, MapperFactory.Create());
        var result = await handler.Handle(new GetUrun.GetUrunQuery(urun.Id), CancellationToken.None);

        var variant = Assert.Single(result.UrunTurleri);
        Assert.Equal("NIKE-AM-42", variant.StokKod);
        Assert.Equal(15, variant.StokAded);
    }
}
