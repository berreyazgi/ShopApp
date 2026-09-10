using Moq;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Application.Features.Admin.Orders.Queries;
using ShopApp.Application.Features.Authentication.DTOs;
using ShopApp.Application.Tests.TestSupport;
using src.Monolith.ShopApp.Domain.Kullanici;
using src.Monolith.ShopApp.Domain.Siparis.Entities;
using Xunit;

namespace ShopApp.Application.Tests.Features.Admin;

public class AdminOrderDetailHandlerTests
{
    private static SiparisEntity CreateOrderWithItem(TestDbContext context, Guid musteriId)
    {
        var order = SiparisEntity.Olustur(musteriId, "SP-0001", Guid.NewGuid());
        order.UrunEkle(Guid.NewGuid(), Guid.NewGuid(), "Test Ürün", "Açıklama", "STK-1", 2, 50m, 0m, Guid.NewGuid());
        order.ToplamlariGuncelle(100m, 0m, 10m);
        context.Siparisler.Add(order);
        context.SiparisDurumlar.Add(new SiparisDurumLookup { Id = 1, DurumIsmi = "Bekleyen Ödeme" });
        context.SaveChanges();
        return order;
    }

    [Fact]
    public async Task GetAdminOrder_ThrowsKeyNotFoundException_WhenOrderDoesNotExist()
    {
        using var context = TestDbContext.Create();
        var identityMock = new Mock<IIdentityService>();
        var kargoMock = new Mock<IKargoReadService>();
        var handler = new GetAdminOrder.GetAdminOrderQueryHandler(context, identityMock.Object, kargoMock.Object);

        await Assert.ThrowsAsync<KeyNotFoundException>(() =>
            handler.Handle(new GetAdminOrder.GetAdminOrderQuery(Guid.NewGuid()), CancellationToken.None));
    }

    [Fact]
    public async Task GetAdminOrder_ResolvesCustomerThroughMusteriAndIncludesPersistedItems()
    {
        using var context = TestDbContext.Create();
        var kullaniciId = Guid.NewGuid();
        var musteri = Musteri.Olustur(kullaniciId);
        context.Musteriler.Add(musteri);
        var order = CreateOrderWithItem(context, musteri.Id);

        var identityMock = new Mock<IIdentityService>();
        identityMock.Setup(x => x.FindByIdAsync(kullaniciId))
            .ReturnsAsync(new IdentityUserInfo(kullaniciId, "cust@example.com", "Cust", "Omer", "5551234567", DateTime.UtcNow, true));
        var kargoMock = new Mock<IKargoReadService>();
        kargoMock.Setup(x => x.GetBySiparisIdAsync(order.Id, It.IsAny<CancellationToken>())).ReturnsAsync((ShipmentInfoDto?)null);

        var handler = new GetAdminOrder.GetAdminOrderQueryHandler(context, identityMock.Object, kargoMock.Object);
        var result = await handler.Handle(new GetAdminOrder.GetAdminOrderQuery(order.Id), CancellationToken.None);

        Assert.Equal(musteri.Id, result.Customer.MusteriId);
        Assert.Equal(kullaniciId, result.Customer.KullaniciId);
        Assert.Equal("Cust Omer", result.Customer.FullName);
        Assert.Single(result.Items);
        Assert.Equal("Test Ürün", result.Items[0].UrunIsmi);
        Assert.Equal(2, result.Items[0].UrunMiktar);
        Assert.Null(result.Shipment);
    }

    [Fact]
    public async Task GetAdminOrder_ReturnsShipment_WhenKargoReadServiceHasOne()
    {
        using var context = TestDbContext.Create();
        var kullaniciId = Guid.NewGuid();
        var musteri = Musteri.Olustur(kullaniciId);
        context.Musteriler.Add(musteri);
        var order = CreateOrderWithItem(context, musteri.Id);

        var identityMock = new Mock<IIdentityService>();
        identityMock.Setup(x => x.FindByIdAsync(kullaniciId))
            .ReturnsAsync(new IdentityUserInfo(kullaniciId, "cust@example.com", "Cust", "Omer", null, DateTime.UtcNow, true));

        var shipment = new ShipmentInfoDto("Yolda", "Yurtiçi Kargo", "TRK-1", new DateOnly(2026, 9, 20));
        var kargoMock = new Mock<IKargoReadService>();
        kargoMock.Setup(x => x.GetBySiparisIdAsync(order.Id, It.IsAny<CancellationToken>())).ReturnsAsync(shipment);

        var handler = new GetAdminOrder.GetAdminOrderQueryHandler(context, identityMock.Object, kargoMock.Object);
        var result = await handler.Handle(new GetAdminOrder.GetAdminOrderQuery(order.Id), CancellationToken.None);

        Assert.NotNull(result.Shipment);
        Assert.Equal("Yolda", result.Shipment!.Status);
        Assert.Equal("TRK-1", result.Shipment.TrackingNumber);
    }
}
