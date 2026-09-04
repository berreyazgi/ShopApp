using Moq;
using ShopApp.Application.Abstractions;
using ShopApp.Application.SepetUrunleri.Commands.CreateSepetUrunu;
using ShopApp.Application.SepetUrunleri.Commands.DeleteSepetUrunu;
using ShopApp.Application.SepetUrunleri.Commands.UpdateSepetUrunu;
using ShopApp.Application.Tests.TestSupport;
using src.Monolith.ShopApp.Domain.Sepet.Entities;
using Xunit;

namespace ShopApp.Application.Tests.SepetUrunleri;

public class SepetUrunuCommandHandlerTests
{
    private static readonly CurrentCustomer Owner = new(Guid.NewGuid(), Guid.NewGuid());
    private static readonly CurrentCustomer Stranger = new(Guid.NewGuid(), Guid.NewGuid());

    private static SepetUrunu CreateItemWithParent(Guid musteriId)
    {
        var sepet = SepetEntity.Olustur(musteriId, Guid.NewGuid());
        var urun = SepetUrunu.Olustur(sepet.Id, Guid.NewGuid(), 2, 15m, musteriId);
        PrivateNavigation.Set(urun, nameof(SepetUrunu.SepetEntity), sepet);
        return urun;
    }

    [Fact]
    public async Task Create_Throws_WhenParentCartBelongsToAnotherCustomer()
    {
        var sepet = SepetEntity.Olustur(Owner.MusteriId, Owner.KullaniciId);

        var sepetRepository = new Mock<ISepetRepository>();
        sepetRepository.Setup(r => r.GetByIdAsync(sepet.Id, It.IsAny<CancellationToken>())).ReturnsAsync(sepet);
        var urunuRepository = new Mock<ISepetUrunuRepository>();

        var handler = new CreateSepetUrunuCommandHandler(urunuRepository.Object, sepetRepository.Object, CustomerContextFactory.For(Stranger).Object);

        await Assert.ThrowsAsync<KeyNotFoundException>(() =>
            handler.Handle(new CreateSepetUrunuCommand(sepet.Id, Guid.NewGuid(), 1, 10m), CancellationToken.None));

        urunuRepository.Verify(r => r.AddAsync(It.IsAny<SepetUrunu>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Fact]
    public async Task Create_Succeeds_WhenParentCartBelongsToCaller()
    {
        var sepet = SepetEntity.Olustur(Owner.MusteriId, Owner.KullaniciId);

        var sepetRepository = new Mock<ISepetRepository>();
        sepetRepository.Setup(r => r.GetByIdAsync(sepet.Id, It.IsAny<CancellationToken>())).ReturnsAsync(sepet);
        var urunuRepository = new Mock<ISepetUrunuRepository>();

        var handler = new CreateSepetUrunuCommandHandler(urunuRepository.Object, sepetRepository.Object, CustomerContextFactory.For(Owner).Object);

        var id = await handler.Handle(new CreateSepetUrunuCommand(sepet.Id, Guid.NewGuid(), 1, 10m), CancellationToken.None);

        Assert.NotEqual(Guid.Empty, id);
        urunuRepository.Verify(r => r.AddAsync(It.IsAny<SepetUrunu>(), It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task Update_Throws_WhenItemBelongsToAnotherCustomersCart()
    {
        var urun = CreateItemWithParent(Owner.MusteriId);
        var repository = new Mock<ISepetUrunuRepository>();
        repository.Setup(r => r.GetByIdAsync(urun.SepetId, urun.Id, It.IsAny<CancellationToken>())).ReturnsAsync(urun);

        var handler = new UpdateSepetUrunuCommandHandler(repository.Object, CustomerContextFactory.For(Stranger).Object);

        await Assert.ThrowsAsync<KeyNotFoundException>(() =>
            handler.Handle(new UpdateSepetUrunuCommand(urun.SepetId, urun.Id, 5), CancellationToken.None));

        repository.Verify(r => r.UpdateAsync(It.IsAny<SepetUrunu>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Fact]
    public async Task Update_Succeeds_WhenItemBelongsToCallersCart()
    {
        var urun = CreateItemWithParent(Owner.MusteriId);
        var repository = new Mock<ISepetUrunuRepository>();
        repository.Setup(r => r.GetByIdAsync(urun.SepetId, urun.Id, It.IsAny<CancellationToken>())).ReturnsAsync(urun);

        var handler = new UpdateSepetUrunuCommandHandler(repository.Object, CustomerContextFactory.For(Owner).Object);

        await handler.Handle(new UpdateSepetUrunuCommand(urun.SepetId, urun.Id, 5), CancellationToken.None);

        Assert.Equal(5, urun.UrunMiktar);
        repository.Verify(r => r.UpdateAsync(urun, It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task Delete_Throws_WhenItemBelongsToAnotherCustomersCart()
    {
        var urun = CreateItemWithParent(Owner.MusteriId);
        var repository = new Mock<ISepetUrunuRepository>();
        repository.Setup(r => r.GetByIdAsync(urun.SepetId, urun.Id, It.IsAny<CancellationToken>())).ReturnsAsync(urun);

        var handler = new DeleteSepetUrunuCommandHandler(repository.Object, CustomerContextFactory.For(Stranger).Object);

        await Assert.ThrowsAsync<KeyNotFoundException>(() =>
            handler.Handle(new DeleteSepetUrunuCommand(urun.SepetId, urun.Id), CancellationToken.None));

        repository.Verify(r => r.DeleteAsync(It.IsAny<SepetUrunu>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Fact]
    public async Task Delete_Succeeds_WhenItemBelongsToCallersCart()
    {
        var urun = CreateItemWithParent(Owner.MusteriId);
        var repository = new Mock<ISepetUrunuRepository>();
        repository.Setup(r => r.GetByIdAsync(urun.SepetId, urun.Id, It.IsAny<CancellationToken>())).ReturnsAsync(urun);

        var handler = new DeleteSepetUrunuCommandHandler(repository.Object, CustomerContextFactory.For(Owner).Object);

        await handler.Handle(new DeleteSepetUrunuCommand(urun.SepetId, urun.Id), CancellationToken.None);

        repository.Verify(r => r.DeleteAsync(urun, It.IsAny<CancellationToken>()), Times.Once);
    }
}
