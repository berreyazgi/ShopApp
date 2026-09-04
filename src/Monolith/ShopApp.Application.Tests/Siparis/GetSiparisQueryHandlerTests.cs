using ShopApp.Application.Abstractions;
using ShopApp.Application.Siparis.Queries;
using ShopApp.Application.Tests.TestSupport;
using src.Monolith.ShopApp.Domain.Siparisler;
using Xunit;

namespace ShopApp.Application.Tests.Siparis;

public class GetSiparisQueryHandlerTests
{
    private static readonly CurrentCustomer Owner = new(Guid.NewGuid(), Guid.NewGuid());
    private static readonly CurrentCustomer Stranger = new(Guid.NewGuid(), Guid.NewGuid());

    [Fact]
    public async Task Handle_ReturnsOrder_WhenOwnedByCaller()
    {
        await using var context = TestDbContext.Create();
        var siparis = SiparisEntity.Olustur(Owner.MusteriId, "SIP-TEST-5", Owner.KullaniciId);
        context.Siparisler.Add(siparis);
        context.SiparisDurumlar.Add(new SiparisDurumLookup { Id = siparis.DurumId, DurumIsmi = "Bekleyen Ödeme" });
        await context.SaveChangesAsync();

        var handler = new GetSiparis.GetSiparisQueryHandler(context, CustomerContextFactory.For(Owner).Object, MapperFactory.Create());

        var result = await handler.Handle(new GetSiparis.GetSiparisQuery { Id = siparis.Id }, CancellationToken.None);

        Assert.Equal(siparis.Id, result.Id);
        Assert.Equal(Owner.MusteriId, result.MusteriId);
        Assert.Equal("Bekleyen Ödeme", result.DurumIsmi);
    }

    [Fact]
    public async Task Handle_Throws_WhenOrderBelongsToAnotherCustomer()
    {
        await using var context = TestDbContext.Create();
        var siparis = SiparisEntity.Olustur(Owner.MusteriId, "SIP-TEST-6", Owner.KullaniciId);
        context.Siparisler.Add(siparis);
        await context.SaveChangesAsync();

        var handler = new GetSiparis.GetSiparisQueryHandler(context, CustomerContextFactory.For(Stranger).Object, MapperFactory.Create());

        await Assert.ThrowsAsync<KeyNotFoundException>(() =>
            handler.Handle(new GetSiparis.GetSiparisQuery { Id = siparis.Id }, CancellationToken.None));
    }

    [Fact]
    public async Task Handle_Throws_WhenOrderDoesNotExist()
    {
        await using var context = TestDbContext.Create();

        var handler = new GetSiparis.GetSiparisQueryHandler(context, CustomerContextFactory.For(Owner).Object, MapperFactory.Create());

        await Assert.ThrowsAsync<KeyNotFoundException>(() =>
            handler.Handle(new GetSiparis.GetSiparisQuery { Id = Guid.NewGuid() }, CancellationToken.None));
    }

    [Fact]
    public async Task GetMySiparisler_OnlyReturnsCallersOwnOrders()
    {
        await using var context = TestDbContext.Create();
        var ownerOrder = SiparisEntity.Olustur(Owner.MusteriId, "SIP-TEST-7", Owner.KullaniciId);
        var strangerOrder = SiparisEntity.Olustur(Stranger.MusteriId, "SIP-TEST-8", Stranger.KullaniciId);
        context.Siparisler.AddRange(ownerOrder, strangerOrder);
        context.SiparisDurumlar.Add(new SiparisDurumLookup { Id = ownerOrder.DurumId, DurumIsmi = "Bekleyen Ödeme" });
        await context.SaveChangesAsync();

        var handler = new GetMySiparisler.GetMySiparislerQueryHandler(context, CustomerContextFactory.For(Owner).Object, MapperFactory.Create());

        var result = await handler.Handle(new GetMySiparisler.GetMySiparislerQuery(), CancellationToken.None);

        var dto = Assert.Single(result);
        Assert.Equal(ownerOrder.Id, dto.Id);
    }
}
