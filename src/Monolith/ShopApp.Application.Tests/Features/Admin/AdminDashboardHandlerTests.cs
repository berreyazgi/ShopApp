using Moq;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Application.Features.Admin.Dashboard.Queries;
using ShopApp.Application.Features.Authentication.DTOs;
using ShopApp.Application.Tests.TestSupport;
using ShopApp.Domain.Urun.Entities;
using src.Monolith.ShopApp.Domain.Kullanici;
using src.Monolith.ShopApp.Domain.Siparis.Entities;
using UrunEntity = ShopApp.Domain.Urun.Entities.Urun;
using Xunit;
using MediatR;

namespace ShopApp.Application.Tests.Features.Admin;

public class AdminDashboardHandlerTests
{
    private static IMediator CreateRealMediator(TestDbContext context, Mock<IIdentityService> identityMock)
    {
        var mediatorMock = new Mock<IMediator>();
        var ordersHandler = new ShopApp.Application.Features.Admin.Orders.Queries.GetAdminOrders.GetAdminOrdersQueryHandler(context, identityMock.Object);
        mediatorMock
            .Setup(m => m.Send(It.IsAny<ShopApp.Application.Features.Admin.Orders.Queries.GetAdminOrders.GetAdminOrdersQuery>(), It.IsAny<CancellationToken>()))
            .Returns((ShopApp.Application.Features.Admin.Orders.Queries.GetAdminOrders.GetAdminOrdersQuery q, CancellationToken ct) => ordersHandler.Handle(q, ct));
        return mediatorMock.Object;
    }

    [Fact]
    public async Task GetAdminDashboard_CountsRealProductsAndCategories()
    {
        using var context = TestDbContext.Create();
        var kategori = new Kategori { KategoriAd = "Giyim" };
        context.Kategori.Add(kategori);
        context.Urun.Add(new UrunEntity { KategoriId = kategori.Id, UrunAd = "Ürün 1", MarkaAd = "Marka", Fiyat = 10m });
        context.Urun.Add(new UrunEntity { KategoriId = kategori.Id, UrunAd = "Ürün 2", MarkaAd = "Marka", Fiyat = 20m, AktifMi = false });
        await context.SaveChangesAsync();

        var identityMock = new Mock<IIdentityService>();
        var handler = new GetAdminDashboard.GetAdminDashboardQueryHandler(context, CreateRealMediator(context, identityMock));
        var result = await handler.Handle(new GetAdminDashboard.GetAdminDashboardQuery(), CancellationToken.None);

        Assert.Equal(2, result.TotalProducts);
        Assert.Equal(1, result.TotalCategories);
    }

    [Fact]
    public async Task GetAdminDashboard_PendingOrders_CountsOnlyBekleyenOdeme()
    {
        using var context = TestDbContext.Create();
        context.SiparisDurumlar.Add(new SiparisDurumLookup { Id = 1, DurumIsmi = "BekleyenOdeme" });
        context.SiparisDurumlar.Add(new SiparisDurumLookup { Id = 2, DurumIsmi = "Odenmis" });

        var pending = SiparisEntity.Olustur(Guid.NewGuid(), "SP-1", Guid.NewGuid()); // defaults to BekleyenOdeme (1)
        var paid = SiparisEntity.Olustur(Guid.NewGuid(), "SP-2", Guid.NewGuid());
        paid.DurumGuncelle(2, Guid.NewGuid());
        context.Siparisler.AddRange(pending, paid);
        await context.SaveChangesAsync();

        var identityMock = new Mock<IIdentityService>();
        var handler = new GetAdminDashboard.GetAdminDashboardQueryHandler(context, CreateRealMediator(context, identityMock));
        var result = await handler.Handle(new GetAdminDashboard.GetAdminDashboardQuery(), CancellationToken.None);

        Assert.Equal(1, result.PendingOrders);
    }

    [Fact]
    public async Task GetAdminDashboard_LowStock_OnlyIncludesActiveVariantsAtOrBelowThreshold()
    {
        using var context = TestDbContext.Create();
        var kategori = new Kategori { KategoriAd = "Giyim" };
        context.Kategori.Add(kategori);
        var urun = new UrunEntity { KategoriId = kategori.Id, UrunAd = "Tişört", MarkaAd = "Marka", Fiyat = 10m };
        context.Urun.Add(urun);
        await context.SaveChangesAsync();

        context.UrunTur.AddRange(
            new UrunTur { UrunId = urun.Id, Ad = "S", StokKod = "SK-S", StokAded = 2, AktifMi = true },   // low stock
            new UrunTur { UrunId = urun.Id, Ad = "M", StokKod = "SK-M", StokAded = 20, AktifMi = true },  // plenty
            new UrunTur { UrunId = urun.Id, Ad = "L", StokKod = "SK-L", StokAded = 0, AktifMi = false });  // passive, ignored
        await context.SaveChangesAsync();

        var identityMock = new Mock<IIdentityService>();
        var handler = new GetAdminDashboard.GetAdminDashboardQueryHandler(context, CreateRealMediator(context, identityMock));
        var result = await handler.Handle(new GetAdminDashboard.GetAdminDashboardQuery(), CancellationToken.None);

        Assert.Equal(1, result.LowStockCount);
        Assert.Single(result.LowStockProducts);
        Assert.Equal("S", result.LowStockProducts[0].UrunTurAd);
        Assert.Equal("Tişört", result.LowStockProducts[0].UrunAd);
        Assert.Equal(2, result.LowStockProducts[0].StokAded);
    }

    [Fact]
    public async Task GetAdminDashboard_RecentOrders_ReusesGetAdminOrdersProjection()
    {
        using var context = TestDbContext.Create();
        context.SiparisDurumlar.Add(new SiparisDurumLookup { Id = 1, DurumIsmi = "BekleyenOdeme" });
        var kullaniciId = Guid.NewGuid();
        var musteri = Musteri.Olustur(kullaniciId);
        context.Musteriler.Add(musteri);

        var order = SiparisEntity.Olustur(musteri.Id, "SP-100", Guid.NewGuid());
        order.ToplamlariGuncelle(150m, 0m, 10m);
        context.Siparisler.Add(order);
        await context.SaveChangesAsync();

        var identityMock = new Mock<IIdentityService>();
        identityMock.Setup(x => x.FindByIdsAsync(It.IsAny<IEnumerable<Guid>>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(new Dictionary<Guid, IdentityUserInfo>
            {
                [kullaniciId] = new IdentityUserInfo(kullaniciId, "cust@example.com", "Cust", "Omer", null, DateTime.UtcNow, true)
            });

        var handler = new GetAdminDashboard.GetAdminDashboardQueryHandler(context, CreateRealMediator(context, identityMock));
        var result = await handler.Handle(new GetAdminDashboard.GetAdminDashboardQuery(), CancellationToken.None);

        Assert.Single(result.RecentOrders);
        Assert.Equal("SP-100", result.RecentOrders[0].OrderNumber);
        Assert.Equal("Cust Omer", result.RecentOrders[0].CustomerName);
        Assert.Equal(160m, result.RecentOrders[0].Total);
    }
}
