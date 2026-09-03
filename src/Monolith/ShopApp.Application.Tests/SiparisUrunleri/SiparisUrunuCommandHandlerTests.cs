using Moq;
using ShopApp.Application.Abstractions;
using ShopApp.Application.SiparisUrunleri.Commands.CreateSiparisUrunu;
using ShopApp.Application.SiparisUrunleri.Commands.DeleteSiparisUrunu;
using ShopApp.Application.SiparisUrunleri.Commands.UpdateSiparisUrunu;
using ShopApp.Application.Tests.TestSupport;
using src.Monolith.ShopApp.Domain.Siparisler;
using Xunit;
using SiparisUrunleriEntity = src.Monolith.ShopApp.Domain.Siparisler.SiparisUrunleri;

namespace ShopApp.Application.Tests.SiparisUrunleri;

public class SiparisUrunuCommandHandlerTests
{
    private static readonly CurrentCustomer Owner = new(Guid.NewGuid(), Guid.NewGuid());
    private static readonly CurrentCustomer Stranger = new(Guid.NewGuid(), Guid.NewGuid());

    private static SiparisUrunleriEntity CreateItemWithParent(Guid musteriId)
    {
        var siparis = SiparisEntity.Olustur(musteriId, "SIP-ITEM-TEST", Guid.NewGuid());
        var urun = SiparisUrunleriEntity.Olustur(siparis.Id, Guid.NewGuid(), "Test Ürünü", null, null, 2, 25m, 0m, musteriId);
        PrivateNavigation.Set(urun, nameof(SiparisUrunleriEntity.SiparisEntity), siparis);
        return urun;
    }

    [Fact]
    public async Task Create_Throws_WhenParentOrderBelongsToAnotherCustomer()
    {
        var siparis = SiparisEntity.Olustur(Owner.MusteriId, "SIP-ITEM-9", Owner.KullaniciId);

        var siparisRepository = new Mock<ISiparisRepository>();
        siparisRepository.Setup(r => r.GetByIdAsync(siparis.Id, It.IsAny<CancellationToken>())).ReturnsAsync(siparis);
        var urunuRepository = new Mock<ISiparisUrunuRepository>();

        var handler = new CreateSiparisUrunuCommandHandler(urunuRepository.Object, siparisRepository.Object, CustomerContextFactory.For(Stranger).Object);

        await Assert.ThrowsAsync<KeyNotFoundException>(() =>
            handler.Handle(new CreateSiparisUrunuCommand(siparis.Id, Guid.NewGuid(), "Ürün", null, null, 1, 10m, 0m), CancellationToken.None));

        urunuRepository.Verify(r => r.AddAsync(It.IsAny<SiparisUrunleriEntity>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Fact]
    public async Task Create_Succeeds_WhenParentOrderBelongsToCaller()
    {
        var siparis = SiparisEntity.Olustur(Owner.MusteriId, "SIP-ITEM-10", Owner.KullaniciId);

        var siparisRepository = new Mock<ISiparisRepository>();
        siparisRepository.Setup(r => r.GetByIdAsync(siparis.Id, It.IsAny<CancellationToken>())).ReturnsAsync(siparis);
        var urunuRepository = new Mock<ISiparisUrunuRepository>();

        var handler = new CreateSiparisUrunuCommandHandler(urunuRepository.Object, siparisRepository.Object, CustomerContextFactory.For(Owner).Object);

        var id = await handler.Handle(new CreateSiparisUrunuCommand(siparis.Id, Guid.NewGuid(), "Ürün", null, null, 1, 10m, 0m), CancellationToken.None);

        Assert.NotEqual(Guid.Empty, id);
        urunuRepository.Verify(r => r.AddAsync(It.IsAny<SiparisUrunleriEntity>(), It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task Update_Throws_WhenItemBelongsToAnotherCustomersOrder()
    {
        var urun = CreateItemWithParent(Owner.MusteriId);
        var repository = new Mock<ISiparisUrunuRepository>();
        repository.Setup(r => r.GetByIdAsync(urun.SiparisId, urun.Id, It.IsAny<CancellationToken>())).ReturnsAsync(urun);

        var handler = new UpdateSiparisUrunuCommandHandler(repository.Object, CustomerContextFactory.For(Stranger).Object);

        await Assert.ThrowsAsync<KeyNotFoundException>(() =>
            handler.Handle(new UpdateSiparisUrunuCommand(urun.SiparisId, urun.Id, 5), CancellationToken.None));

        repository.Verify(r => r.UpdateAsync(It.IsAny<SiparisUrunleriEntity>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Fact]
    public async Task Update_Succeeds_WhenItemBelongsToCallersOrder()
    {
        var urun = CreateItemWithParent(Owner.MusteriId);
        var repository = new Mock<ISiparisUrunuRepository>();
        repository.Setup(r => r.GetByIdAsync(urun.SiparisId, urun.Id, It.IsAny<CancellationToken>())).ReturnsAsync(urun);

        var handler = new UpdateSiparisUrunuCommandHandler(repository.Object, CustomerContextFactory.For(Owner).Object);

        await handler.Handle(new UpdateSiparisUrunuCommand(urun.SiparisId, urun.Id, 5), CancellationToken.None);

        Assert.Equal(5, urun.UrunMiktar);
        repository.Verify(r => r.UpdateAsync(urun, It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task Delete_Throws_WhenItemBelongsToAnotherCustomersOrder()
    {
        var urun = CreateItemWithParent(Owner.MusteriId);
        var repository = new Mock<ISiparisUrunuRepository>();
        repository.Setup(r => r.GetByIdAsync(urun.SiparisId, urun.Id, It.IsAny<CancellationToken>())).ReturnsAsync(urun);

        var handler = new DeleteSiparisUrunuCommandHandler(repository.Object, CustomerContextFactory.For(Stranger).Object);

        await Assert.ThrowsAsync<KeyNotFoundException>(() =>
            handler.Handle(new DeleteSiparisUrunuCommand(urun.SiparisId, urun.Id), CancellationToken.None));

        repository.Verify(r => r.DeleteAsync(It.IsAny<SiparisUrunleriEntity>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Fact]
    public async Task Delete_Succeeds_WhenItemBelongsToCallersOrder()
    {
        var urun = CreateItemWithParent(Owner.MusteriId);
        var repository = new Mock<ISiparisUrunuRepository>();
        repository.Setup(r => r.GetByIdAsync(urun.SiparisId, urun.Id, It.IsAny<CancellationToken>())).ReturnsAsync(urun);

        var handler = new DeleteSiparisUrunuCommandHandler(repository.Object, CustomerContextFactory.For(Owner).Object);

        await handler.Handle(new DeleteSiparisUrunuCommand(urun.SiparisId, urun.Id), CancellationToken.None);

        repository.Verify(r => r.DeleteAsync(urun, It.IsAny<CancellationToken>()), Times.Once);
    }
}
