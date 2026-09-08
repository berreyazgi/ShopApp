using Moq;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Application.Features.Siparis.Commands.CreateSiparisUrunu;
using ShopApp.Application.Features.Siparis.Commands.DeleteSiparisUrunu;
using ShopApp.Application.Features.Siparis.Commands.UpdateSiparisUrunu;
using ShopApp.Application.Tests.TestSupport;
using src.Monolith.ShopApp.Domain.Siparis.Entities;
using Xunit;
using SiparisUrunleriEntity = src.Monolith.ShopApp.Domain.Siparis.Entities.SiparisUrunleri;

namespace ShopApp.Application.Tests.Features.Siparis;

public class SiparisUrunuCommandHandlerTests
{
    private static readonly CurrentCustomer Owner = new(Guid.NewGuid(), Guid.NewGuid());
    private static readonly CurrentCustomer Stranger = new(Guid.NewGuid(), Guid.NewGuid());

    private static SiparisEntity CreateSiparisWithItem(CurrentCustomer owner, out SiparisUrunleriEntity urun)
    {
        var siparis = SiparisEntity.Olustur(owner.MusteriId, "SIP-ITEM-TEST", owner.KullaniciId);
        urun = siparis.UrunEkle(Guid.NewGuid(), Guid.NewGuid(), "Test Ürünü", null, null, 2, 25m, 0m, owner.KullaniciId);
        return siparis;
    }

    [Fact]
    public async Task Create_Throws_WhenParentOrderBelongsToAnotherCustomer()
    {
        var siparis = SiparisEntity.Olustur(Owner.MusteriId, "SIP-ITEM-9", Owner.KullaniciId);

        var siparisRepository = new Mock<ISiparisRepository>();
        siparisRepository.Setup(r => r.GetByIdAsync(siparis.Id, It.IsAny<CancellationToken>())).ReturnsAsync(siparis);

        var handler = new CreateSiparisUrunuCommandHandler(siparisRepository.Object, CustomerContextFactory.For(Stranger).Object);

        await Assert.ThrowsAsync<KeyNotFoundException>(() =>
            handler.Handle(new CreateSiparisUrunuCommand(siparis.Id, Guid.NewGuid(), Guid.NewGuid(), "Ürün", null, null, 1, 10m, 0m), CancellationToken.None));

        siparisRepository.Verify(r => r.UpdateAsync(It.IsAny<SiparisEntity>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Fact]
    public async Task Create_Succeeds_WhenParentOrderBelongsToCaller()
    {
        var siparis = SiparisEntity.Olustur(Owner.MusteriId, "SIP-ITEM-10", Owner.KullaniciId);

        var siparisRepository = new Mock<ISiparisRepository>();
        siparisRepository.Setup(r => r.GetByIdAsync(siparis.Id, It.IsAny<CancellationToken>())).ReturnsAsync(siparis);

        var handler = new CreateSiparisUrunuCommandHandler(siparisRepository.Object, CustomerContextFactory.For(Owner).Object);

        var id = await handler.Handle(new CreateSiparisUrunuCommand(siparis.Id, Guid.NewGuid(), Guid.NewGuid(), "Ürün", null, null, 1, 10m, 0m), CancellationToken.None);

        Assert.NotEqual(Guid.Empty, id);
        Assert.Contains(siparis.Urunler, u => u.Id == id);
        siparisRepository.Verify(r => r.UpdateAsync(siparis, It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task Update_Throws_WhenItemBelongsToAnotherCustomersOrder()
    {
        var siparis = CreateSiparisWithItem(Owner, out var urun);
        var repository = new Mock<ISiparisRepository>();
        repository.Setup(r => r.GetByIdAsync(siparis.Id, It.IsAny<CancellationToken>())).ReturnsAsync(siparis);

        var handler = new UpdateSiparisUrunuCommandHandler(repository.Object, CustomerContextFactory.For(Stranger).Object);

        await Assert.ThrowsAsync<KeyNotFoundException>(() =>
            handler.Handle(new UpdateSiparisUrunuCommand(siparis.Id, urun.Id, 5), CancellationToken.None));

        repository.Verify(r => r.UpdateAsync(It.IsAny<SiparisEntity>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Fact]
    public async Task Update_Succeeds_WhenItemBelongsToCallersOrder()
    {
        var siparis = CreateSiparisWithItem(Owner, out var urun);
        var repository = new Mock<ISiparisRepository>();
        repository.Setup(r => r.GetByIdAsync(siparis.Id, It.IsAny<CancellationToken>())).ReturnsAsync(siparis);

        var handler = new UpdateSiparisUrunuCommandHandler(repository.Object, CustomerContextFactory.For(Owner).Object);

        await handler.Handle(new UpdateSiparisUrunuCommand(siparis.Id, urun.Id, 5), CancellationToken.None);

        Assert.Equal(5, urun.UrunMiktar);
        repository.Verify(r => r.UpdateAsync(siparis, It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task Delete_Throws_WhenItemBelongsToAnotherCustomersOrder()
    {
        var siparis = CreateSiparisWithItem(Owner, out var urun);
        var repository = new Mock<ISiparisRepository>();
        repository.Setup(r => r.GetByIdAsync(siparis.Id, It.IsAny<CancellationToken>())).ReturnsAsync(siparis);

        var handler = new DeleteSiparisUrunuCommandHandler(repository.Object, CustomerContextFactory.For(Stranger).Object);

        await Assert.ThrowsAsync<KeyNotFoundException>(() =>
            handler.Handle(new DeleteSiparisUrunuCommand(siparis.Id, urun.Id), CancellationToken.None));

        repository.Verify(r => r.UpdateAsync(It.IsAny<SiparisEntity>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Fact]
    public async Task Delete_Succeeds_WhenItemBelongsToCallersOrder()
    {
        var siparis = CreateSiparisWithItem(Owner, out var urun);
        var repository = new Mock<ISiparisRepository>();
        repository.Setup(r => r.GetByIdAsync(siparis.Id, It.IsAny<CancellationToken>())).ReturnsAsync(siparis);

        var handler = new DeleteSiparisUrunuCommandHandler(repository.Object, CustomerContextFactory.For(Owner).Object);

        await handler.Handle(new DeleteSiparisUrunuCommand(siparis.Id, urun.Id), CancellationToken.None);

        Assert.DoesNotContain(siparis.Urunler, u => u.Id == urun.Id);
        repository.Verify(r => r.UpdateAsync(siparis, It.IsAny<CancellationToken>()), Times.Once);
    }
}
