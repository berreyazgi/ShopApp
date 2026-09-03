using ShopApp.Application.Abstractions;
using ShopApp.Application.Sepet.Queries;
using ShopApp.Application.Tests.TestSupport;
using src.Monolith.ShopApp.Domain.Sepet.Entities;
using Xunit;

namespace ShopApp.Application.Tests.Sepet;

public class GetSepetQueryHandlerTests
{
    private static readonly CurrentCustomer Owner = new(Guid.NewGuid(), Guid.NewGuid());
    private static readonly CurrentCustomer Stranger = new(Guid.NewGuid(), Guid.NewGuid());

    [Fact]
    public async Task Handle_ReturnsCart_WhenOwnedByCaller()
    {
        await using var context = TestDbContext.Create();
        var sepet = SepetEntity.Olustur(Owner.MusteriId, Owner.KullaniciId);
        context.Sepetler.Add(sepet);
        await context.SaveChangesAsync();

        var handler = new GetSepet.GetSepetQueryHandler(context, CustomerContextFactory.For(Owner).Object, MapperFactory.Create());

        var result = await handler.Handle(new GetSepet.GetSepetQuery { Id = sepet.Id }, CancellationToken.None);

        Assert.Equal(sepet.Id, result.Id);
        Assert.Equal(Owner.MusteriId, result.MusteriId);
    }

    [Fact]
    public async Task Handle_Throws_WhenCartBelongsToAnotherCustomer()
    {
        await using var context = TestDbContext.Create();
        var sepet = SepetEntity.Olustur(Owner.MusteriId, Owner.KullaniciId);
        context.Sepetler.Add(sepet);
        await context.SaveChangesAsync();

        var handler = new GetSepet.GetSepetQueryHandler(context, CustomerContextFactory.For(Stranger).Object, MapperFactory.Create());

        await Assert.ThrowsAsync<KeyNotFoundException>(() =>
            handler.Handle(new GetSepet.GetSepetQuery { Id = sepet.Id }, CancellationToken.None));
    }

    [Fact]
    public async Task Handle_Throws_WhenCartDoesNotExist()
    {
        await using var context = TestDbContext.Create();

        var handler = new GetSepet.GetSepetQueryHandler(context, CustomerContextFactory.For(Owner).Object, MapperFactory.Create());

        await Assert.ThrowsAsync<KeyNotFoundException>(() =>
            handler.Handle(new GetSepet.GetSepetQuery { Id = Guid.NewGuid() }, CancellationToken.None));
    }

    [Fact]
    public async Task GetMySepetler_OnlyReturnsCallersOwnCarts()
    {
        await using var context = TestDbContext.Create();
        var ownerCart = SepetEntity.Olustur(Owner.MusteriId, Owner.KullaniciId);
        var strangerCart = SepetEntity.Olustur(Stranger.MusteriId, Stranger.KullaniciId);
        context.Sepetler.AddRange(ownerCart, strangerCart);
        await context.SaveChangesAsync();

        var handler = new GetMySepetler.GetMySepetlerQueryHandler(context, CustomerContextFactory.For(Owner).Object, MapperFactory.Create());

        var result = await handler.Handle(new GetMySepetler.GetMySepetlerQuery(), CancellationToken.None);

        var dto = Assert.Single(result);
        Assert.Equal(ownerCart.Id, dto.Id);
    }
}
