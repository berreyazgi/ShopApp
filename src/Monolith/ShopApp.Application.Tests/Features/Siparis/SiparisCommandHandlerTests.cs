using Moq;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Application.Features.Siparis.Commands.CreateSiparis;
using ShopApp.Application.Features.Siparis.Commands.DeleteSiparis;
using ShopApp.Application.Features.Siparis.Commands.UpdateSiparis;
using ShopApp.Application.Tests.TestSupport;
using src.Monolith.ShopApp.Domain.Siparis.Entities;
using src.Monolith.ShopApp.Domain.Siparis.Enums;
using Xunit;

namespace ShopApp.Application.Tests.Features.Siparis;

public class SiparisCommandHandlerTests
{
    private static readonly CurrentCustomer Owner = new(Guid.NewGuid(), Guid.NewGuid());
    private static readonly CurrentCustomer Stranger = new(Guid.NewGuid(), Guid.NewGuid());

    [Fact]
    public async Task Create_DerivesMusteriId_FromAuthenticatedCustomer()
    {
        var repository = new Mock<ISiparisRepository>();
        SiparisEntity? added = null;
        repository.Setup(r => r.AddAsync(It.IsAny<SiparisEntity>(), It.IsAny<CancellationToken>()))
            .Callback<SiparisEntity, CancellationToken>((entity, _) => added = entity)
            .Returns(Task.CompletedTask);

        var handler = new CreateSiparisCommandHandler(repository.Object, CustomerContextFactory.For(Owner).Object);

        await handler.Handle(new CreateSiparisCommand(), CancellationToken.None);

        Assert.NotNull(added);
        Assert.Equal(Owner.MusteriId, added!.MusteriId);
    }

    [Fact]
    public async Task Update_Throws_WhenOrderBelongsToAnotherCustomer()
    {
        var siparis = SiparisEntity.Olustur(Owner.MusteriId, "SIP-TEST-1", Owner.KullaniciId);
        var repository = new Mock<ISiparisRepository>();
        repository.Setup(r => r.GetByIdAsync(siparis.Id, It.IsAny<CancellationToken>())).ReturnsAsync(siparis);

        var handler = new UpdateSiparisCommandHandler(repository.Object, CustomerContextFactory.For(Stranger).Object);

        await Assert.ThrowsAsync<KeyNotFoundException>(() =>
            handler.Handle(new UpdateSiparisCommand(siparis.Id, (int)SiparisDurum.IptalEdildi), CancellationToken.None));

        repository.Verify(r => r.UpdateAsync(It.IsAny<SiparisEntity>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Fact]
    public async Task Update_Throws_WhenOrderDoesNotExist()
    {
        var repository = new Mock<ISiparisRepository>();
        repository.Setup(r => r.GetByIdAsync(It.IsAny<Guid>(), It.IsAny<CancellationToken>())).ReturnsAsync((SiparisEntity?)null);

        var handler = new UpdateSiparisCommandHandler(repository.Object, CustomerContextFactory.For(Owner).Object);

        await Assert.ThrowsAsync<KeyNotFoundException>(() =>
            handler.Handle(new UpdateSiparisCommand(Guid.NewGuid(), (int)SiparisDurum.Odenmis), CancellationToken.None));
    }

    [Fact]
    public async Task Update_Succeeds_WhenOrderBelongsToCaller()
    {
        var siparis = SiparisEntity.Olustur(Owner.MusteriId, "SIP-TEST-2", Owner.KullaniciId);
        var repository = new Mock<ISiparisRepository>();
        repository.Setup(r => r.GetByIdAsync(siparis.Id, It.IsAny<CancellationToken>())).ReturnsAsync(siparis);

        var handler = new UpdateSiparisCommandHandler(repository.Object, CustomerContextFactory.For(Owner).Object);

        await handler.Handle(new UpdateSiparisCommand(siparis.Id, (int)SiparisDurum.IptalEdildi), CancellationToken.None);

        Assert.Equal((int)SiparisDurum.IptalEdildi, siparis.DurumId);
        repository.Verify(r => r.UpdateAsync(siparis, It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task Delete_Throws_WhenOrderBelongsToAnotherCustomer()
    {
        var siparis = SiparisEntity.Olustur(Owner.MusteriId, "SIP-TEST-3", Owner.KullaniciId);
        var repository = new Mock<ISiparisRepository>();
        repository.Setup(r => r.GetByIdAsync(siparis.Id, It.IsAny<CancellationToken>())).ReturnsAsync(siparis);

        var handler = new DeleteSiparisCommandHandler(repository.Object, CustomerContextFactory.For(Stranger).Object);

        await Assert.ThrowsAsync<KeyNotFoundException>(() =>
            handler.Handle(new DeleteSiparisCommand(siparis.Id), CancellationToken.None));

        repository.Verify(r => r.DeleteAsync(It.IsAny<SiparisEntity>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Fact]
    public async Task Delete_Succeeds_WhenOrderBelongsToCaller()
    {
        var siparis = SiparisEntity.Olustur(Owner.MusteriId, "SIP-TEST-4", Owner.KullaniciId);
        var repository = new Mock<ISiparisRepository>();
        repository.Setup(r => r.GetByIdAsync(siparis.Id, It.IsAny<CancellationToken>())).ReturnsAsync(siparis);

        var handler = new DeleteSiparisCommandHandler(repository.Object, CustomerContextFactory.For(Owner).Object);

        await handler.Handle(new DeleteSiparisCommand(siparis.Id), CancellationToken.None);

        repository.Verify(r => r.DeleteAsync(siparis, It.IsAny<CancellationToken>()), Times.Once);
    }
}
