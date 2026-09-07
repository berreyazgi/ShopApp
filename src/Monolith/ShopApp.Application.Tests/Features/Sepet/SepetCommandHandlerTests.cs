using Moq;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Application.Features.Sepet.Commands.CreateSepet;
using ShopApp.Application.Features.Sepet.Commands.DeleteSepet;
using ShopApp.Application.Features.Sepet.Commands.UpdateSepet;
using ShopApp.Application.Tests.TestSupport;
using src.Monolith.ShopApp.Domain.Sepet.Enums;
using src.Monolith.ShopApp.Domain.Sepet.Entities;
using Xunit;

namespace ShopApp.Application.Tests.Features.Sepet;

public class SepetCommandHandlerTests
{
    private static readonly CurrentCustomer Owner = new(Guid.NewGuid(), Guid.NewGuid());
    private static readonly CurrentCustomer Stranger = new(Guid.NewGuid(), Guid.NewGuid());

    [Fact]
    public async Task Create_DerivesMusteriId_FromAuthenticatedCustomer()
    {
        var repository = new Mock<ISepetRepository>();
        SepetEntity? added = null;
        repository.Setup(r => r.AddAsync(It.IsAny<SepetEntity>(), It.IsAny<CancellationToken>()))
            .Callback<SepetEntity, CancellationToken>((entity, _) => added = entity)
            .Returns(Task.CompletedTask);

        var handler = new CreateSepetCommandHandler(repository.Object, CustomerContextFactory.For(Owner).Object);

        await handler.Handle(new CreateSepetCommand(), CancellationToken.None);

        Assert.NotNull(added);
        Assert.Equal(Owner.MusteriId, added!.MusteriId);
    }

    [Fact]
    public async Task Update_Throws_WhenCartBelongsToAnotherCustomer()
    {
        var sepet = SepetEntity.Olustur(Owner.MusteriId, Owner.KullaniciId);
        var repository = new Mock<ISepetRepository>();
        repository.Setup(r => r.GetByIdAsync(sepet.Id, It.IsAny<CancellationToken>())).ReturnsAsync(sepet);

        var handler = new UpdateSepetCommandHandler(repository.Object, CustomerContextFactory.For(Stranger).Object);

        await Assert.ThrowsAsync<KeyNotFoundException>(() =>
            handler.Handle(new UpdateSepetCommand(sepet.Id, (int)SepetDurum.IptalEdilmis), CancellationToken.None));

        repository.Verify(r => r.UpdateAsync(It.IsAny<SepetEntity>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Fact]
    public async Task Update_Throws_WhenCartDoesNotExist()
    {
        var repository = new Mock<ISepetRepository>();
        repository.Setup(r => r.GetByIdAsync(It.IsAny<Guid>(), It.IsAny<CancellationToken>())).ReturnsAsync((SepetEntity?)null);

        var handler = new UpdateSepetCommandHandler(repository.Object, CustomerContextFactory.For(Owner).Object);

        await Assert.ThrowsAsync<KeyNotFoundException>(() =>
            handler.Handle(new UpdateSepetCommand(Guid.NewGuid(), (int)SepetDurum.Aktif), CancellationToken.None));
    }

    [Fact]
    public async Task Update_Succeeds_WhenCartBelongsToCaller()
    {
        var sepet = SepetEntity.Olustur(Owner.MusteriId, Owner.KullaniciId);
        var repository = new Mock<ISepetRepository>();
        repository.Setup(r => r.GetByIdAsync(sepet.Id, It.IsAny<CancellationToken>())).ReturnsAsync(sepet);

        var handler = new UpdateSepetCommandHandler(repository.Object, CustomerContextFactory.For(Owner).Object);

        await handler.Handle(new UpdateSepetCommand(sepet.Id, (int)SepetDurum.IptalEdilmis), CancellationToken.None);

        Assert.Equal((int)SepetDurum.IptalEdilmis, sepet.DurumId);
        repository.Verify(r => r.UpdateAsync(sepet, It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task Delete_Throws_WhenCartBelongsToAnotherCustomer()
    {
        var sepet = SepetEntity.Olustur(Owner.MusteriId, Owner.KullaniciId);
        var repository = new Mock<ISepetRepository>();
        repository.Setup(r => r.GetByIdAsync(sepet.Id, It.IsAny<CancellationToken>())).ReturnsAsync(sepet);

        var handler = new DeleteSepetCommandHandler(repository.Object, CustomerContextFactory.For(Stranger).Object);

        await Assert.ThrowsAsync<KeyNotFoundException>(() =>
            handler.Handle(new DeleteSepetCommand(sepet.Id), CancellationToken.None));

        repository.Verify(r => r.DeleteAsync(It.IsAny<SepetEntity>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Fact]
    public async Task Delete_Succeeds_WhenCartBelongsToCaller()
    {
        var sepet = SepetEntity.Olustur(Owner.MusteriId, Owner.KullaniciId);
        var repository = new Mock<ISepetRepository>();
        repository.Setup(r => r.GetByIdAsync(sepet.Id, It.IsAny<CancellationToken>())).ReturnsAsync(sepet);

        var handler = new DeleteSepetCommandHandler(repository.Object, CustomerContextFactory.For(Owner).Object);

        await handler.Handle(new DeleteSepetCommand(sepet.Id), CancellationToken.None);

        repository.Verify(r => r.DeleteAsync(sepet, It.IsAny<CancellationToken>()), Times.Once);
    }
}
