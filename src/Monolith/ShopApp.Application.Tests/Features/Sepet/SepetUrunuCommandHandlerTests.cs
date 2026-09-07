using Moq;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Application.Features.Sepet.Commands.CreateSepetUrunu;
using ShopApp.Application.Features.Sepet.Commands.DeleteSepetUrunu;
using ShopApp.Application.Features.Sepet.Commands.UpdateSepetUrunu;
using ShopApp.Application.Tests.TestSupport;
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

    [Fact]
    public async Task Create_Throws_WhenParentCartBelongsToAnotherCustomer()
    {
        var sepet = SepetEntity.Olustur(Owner.MusteriId, Owner.KullaniciId);

        var sepetRepository = new Mock<ISepetRepository>();
        sepetRepository.Setup(r => r.GetByIdAsync(sepet.Id, It.IsAny<CancellationToken>())).ReturnsAsync(sepet);

        var handler = new CreateSepetUrunuCommandHandler(sepetRepository.Object, CustomerContextFactory.For(Stranger).Object);

        await Assert.ThrowsAsync<KeyNotFoundException>(() =>
            handler.Handle(new CreateSepetUrunuCommand(sepet.Id, Guid.NewGuid(), 1, 10m), CancellationToken.None));

        sepetRepository.Verify(r => r.UpdateAsync(It.IsAny<SepetEntity>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Fact]
    public async Task Create_Succeeds_WhenParentCartBelongsToCaller()
    {
        var sepet = SepetEntity.Olustur(Owner.MusteriId, Owner.KullaniciId);

        var sepetRepository = new Mock<ISepetRepository>();
        sepetRepository.Setup(r => r.GetByIdAsync(sepet.Id, It.IsAny<CancellationToken>())).ReturnsAsync(sepet);

        var handler = new CreateSepetUrunuCommandHandler(sepetRepository.Object, CustomerContextFactory.For(Owner).Object);

        var id = await handler.Handle(new CreateSepetUrunuCommand(sepet.Id, Guid.NewGuid(), 1, 10m), CancellationToken.None);

        Assert.NotEqual(Guid.Empty, id);
        Assert.Contains(sepet.Urunler, u => u.Id == id);
        sepetRepository.Verify(r => r.UpdateAsync(sepet, It.IsAny<CancellationToken>()), Times.Once);
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
