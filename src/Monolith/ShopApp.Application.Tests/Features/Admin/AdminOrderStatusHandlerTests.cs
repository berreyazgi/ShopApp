using FluentValidation;
using FluentValidation.TestHelper;
using Moq;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Application.Features.Admin.Orders.Commands.UpdateAdminOrderStatus;
using ShopApp.Application.Tests.TestSupport;
using src.Monolith.ShopApp.Domain.Siparis.Entities;
using Xunit;

namespace ShopApp.Application.Tests.Features.Admin;

public class AdminOrderStatusHandlerTests
{
    private static SiparisEntity CreateOrder(TestDbContext context)
    {
        var order = SiparisEntity.Olustur(Guid.NewGuid(), "SP-0001", Guid.NewGuid());
        context.Siparisler.Add(order);
        context.SaveChanges();
        return order;
    }

    [Fact]
    public async Task UpdateAdminOrderStatus_ThrowsKeyNotFoundException_WhenOrderDoesNotExist()
    {
        using var context = TestDbContext.Create();
        var identityMock = new Mock<IIdentityService>();
        var handler = new UpdateAdminOrderStatusCommandHandler(context, identityMock.Object);

        await Assert.ThrowsAsync<KeyNotFoundException>(() =>
            handler.Handle(new UpdateAdminOrderStatusCommand(Guid.NewGuid(), 2), CancellationToken.None));
    }

    [Fact]
    public async Task UpdateAdminOrderStatus_ThrowsValidationException_WhenStatusDoesNotExist()
    {
        using var context = TestDbContext.Create();
        var order = CreateOrder(context);
        context.SiparisDurumlar.Add(new SiparisDurumLookup { Id = 1, DurumIsmi = "Bekleyen Ödeme" });
        await context.SaveChangesAsync();

        var identityMock = new Mock<IIdentityService>();
        identityMock.Setup(x => x.GetCurrentUserId()).Returns(Guid.NewGuid());
        var handler = new UpdateAdminOrderStatusCommandHandler(context, identityMock.Object);

        await Assert.ThrowsAsync<ValidationException>(() =>
            handler.Handle(new UpdateAdminOrderStatusCommand(order.Id, 999999), CancellationToken.None));
    }

    [Fact]
    public async Task UpdateAdminOrderStatus_ThrowsUnauthorizedAccessException_WhenAdminIdCannotBeResolved()
    {
        using var context = TestDbContext.Create();
        var order = CreateOrder(context);
        context.SiparisDurumlar.Add(new SiparisDurumLookup { Id = 2, DurumIsmi = "Ödenmiş" });
        await context.SaveChangesAsync();

        var identityMock = new Mock<IIdentityService>();
        identityMock.Setup(x => x.GetCurrentUserId()).Returns((Guid?)null);
        var handler = new UpdateAdminOrderStatusCommandHandler(context, identityMock.Object);

        await Assert.ThrowsAsync<UnauthorizedAccessException>(() =>
            handler.Handle(new UpdateAdminOrderStatusCommand(order.Id, 2), CancellationToken.None));

        var unchanged = await context.Siparisler.FindAsync(order.Id);
        Assert.NotEqual(2, unchanged!.DurumId);
    }

    [Fact]
    public async Task UpdateAdminOrderStatus_NeverWritesGuidEmptyAsTheAuditActor()
    {
        using var context = TestDbContext.Create();
        var order = CreateOrder(context);
        context.SiparisDurumlar.Add(new SiparisDurumLookup { Id = 2, DurumIsmi = "Ödenmiş" });
        await context.SaveChangesAsync();

        var realAdminId = Guid.NewGuid();
        var identityMock = new Mock<IIdentityService>();
        identityMock.Setup(x => x.GetCurrentUserId()).Returns(realAdminId);
        var handler = new UpdateAdminOrderStatusCommandHandler(context, identityMock.Object);

        await handler.Handle(new UpdateAdminOrderStatusCommand(order.Id, 2), CancellationToken.None);

        var updated = await context.Siparisler.FindAsync(order.Id);
        Assert.Equal(2, updated!.DurumId);
        Assert.Equal(realAdminId, updated.GuncelleyenKullaniciId);
        Assert.NotEqual(Guid.Empty, updated.GuncelleyenKullaniciId);
    }

    [Fact]
    public void UpdateAdminOrderStatusCommandValidator_Rejects_NonPositiveDurumId()
    {
        var result = new UpdateAdminOrderStatusCommandValidator().TestValidate(new UpdateAdminOrderStatusCommand(Guid.NewGuid(), 0));
        result.ShouldHaveValidationErrorFor(x => x.DurumId);
    }

    [Fact]
    public void UpdateAdminOrderStatusCommandValidator_Accepts_PositiveDurumId()
    {
        var result = new UpdateAdminOrderStatusCommandValidator().TestValidate(new UpdateAdminOrderStatusCommand(Guid.NewGuid(), 3));
        result.ShouldNotHaveValidationErrorFor(x => x.DurumId);
    }
}
