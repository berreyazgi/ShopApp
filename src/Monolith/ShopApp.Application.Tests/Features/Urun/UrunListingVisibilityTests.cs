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
    public async Task GetUrunQuery_Detail_IncludesUrunVaryantStokKodAndStokAdet()
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

        var tur = new UrunVaryant
        {
            UrunId = urun.Id,
            Beden = "42",
            StokKod = "NIKE-AM-42",
            StokAdet = 15,
        };
        context.UrunVaryant.Add(tur);
        context.SaveChanges();

        var handler = new GetUrun.GetUrunQueryHandler(context, MapperFactory.Create());
        var result = await handler.Handle(new GetUrun.GetUrunQuery(urun.Id), CancellationToken.None);

        var variant = Assert.Single(result.Varyantlar);
        Assert.Equal("NIKE-AM-42", variant.StokKod);
        Assert.Equal(15, variant.StokAdet);
    }

    [Fact]
    public async Task GetUrunQuery_PublicDetail_ReturnsProductAttributesAndOnlyActiveVariants()
    {
        using var context = TestDbContext.Create();
        var (kategori, _, _) = SeedActiveAndPassiveProduct(context);
        var urun = new UrunEntity
        {
            KategoriId = kategori.Id,
            UrunAd = "Oversize Basic T-Shirt",
            MarkaAd = "ShopApp",
            Fiyat = 799.90m,
            AktifMi = true,
        };
        context.Urun.Add(urun);
        context.SaveChanges();

        var activeVariant = new UrunVaryant
        {
            UrunId = urun.Id,
            Beden = "M",
            Renk = "Siyah",
            StokKod = "TSHIRT-BLK-M",
            StokAdet = 5,
            AktifMi = true,
        };
        var passiveVariant = new UrunVaryant
        {
            UrunId = urun.Id,
            Beden = "L",
            Renk = "Siyah",
            StokKod = "TSHIRT-BLK-L",
            StokAdet = 3,
            AktifMi = false,
        };
        context.UrunVaryant.AddRange(activeVariant, passiveVariant);
        context.UrunOzellik.AddRange(
            new UrunOzellik(urun.Id, "Kalıp", "Oversize", 2),
            new UrunOzellik(urun.Id, "Kumaş", "%100 Pamuk", 1));
        context.SaveChanges();

        var handler = new GetUrun.GetUrunQueryHandler(context, MapperFactory.Create());

        var result = await handler.Handle(new GetUrun.GetUrunQuery(urun.Id), CancellationToken.None);

        var variant = Assert.Single(result.Varyantlar);
        Assert.Equal(activeVariant.Id, variant.Id);
        Assert.Equal("M", variant.Beden);
        Assert.Equal("Siyah", variant.Renk);
        Assert.Collection(
            result.Ozellikler,
            first => Assert.Equal("Kumaş", first.OzellikAd),
            second => Assert.Equal("Kalıp", second.OzellikAd));

        var adminResult = await handler.Handle(new GetUrun.GetUrunQuery(urun.Id, IncludePassive: true), CancellationToken.None);
        Assert.Equal(2, adminResult.Varyantlar.Count);
    }

    [Fact]
    public async Task GetUrunOzellikleriQuery_ReturnsPersistedAttributesInDisplayOrder()
    {
        using var context = TestDbContext.Create();
        var (_, urun, _) = SeedActiveAndPassiveProduct(context);
        context.UrunOzellik.AddRange(
            new UrunOzellik(urun.Id, "Kol Tipi", "Kısa Kol", 3),
            new UrunOzellik(urun.Id, "Kumaş", "%100 Pamuk", 1));
        context.SaveChanges();

        var handler = new GetUrunOzellikleri.GetUrunOzellikleriQueryHandler(context, MapperFactory.Create());
        var result = await handler.Handle(new GetUrunOzellikleri.GetUrunOzellikleriQuery(urun.Id), CancellationToken.None);

        Assert.Collection(
            result,
            first => Assert.Equal("Kumaş", first.OzellikAd),
            second => Assert.Equal("Kol Tipi", second.OzellikAd));
        Assert.All(result, attribute => Assert.Equal(urun.Id, attribute.UrunId));
    }

    [Fact]
    public async Task GetUrunVaryantlarQuery_ReturnsOnlyActivePersistedVariants()
    {
        using var context = TestDbContext.Create();
        var (_, urun, _) = SeedActiveAndPassiveProduct(context);
        var activeVariant = new UrunVaryant
        {
            UrunId = urun.Id,
            StokKod = "AKTIF-1",
            StokAdet = 4,
            AktifMi = true,
        };
        context.UrunVaryant.AddRange(
            activeVariant,
            new UrunVaryant { UrunId = urun.Id, StokKod = "PASIF-1", StokAdet = 2, AktifMi = false });
        context.SaveChanges();

        var handler = new GetUrunVaryantlar.GetUrunVaryantlarQueryHandler(context, MapperFactory.Create());
        var result = await handler.Handle(new GetUrunVaryantlar.GetUrunVaryantlarQuery(urun.Id), CancellationToken.None);

        var variant = Assert.Single(result);
        Assert.Equal(activeVariant.Id, variant.Id);
        Assert.Equal("AKTIF-1", variant.StokKod);
        Assert.Equal(4, variant.StokAdet);
    }
}
