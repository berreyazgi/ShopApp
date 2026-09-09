using FluentValidation;
using FluentValidation.TestHelper;
using Moq;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Application.Features.Admin.Customers.Commands.UpdateAdminCustomer;
using ShopApp.Application.Features.Admin.Customers.Queries;
using ShopApp.Application.Features.Authentication.DTOs;
using ShopApp.Application.Tests.TestSupport;
using src.Monolith.ShopApp.Domain.Kullanici;
using Xunit;

namespace ShopApp.Application.Tests.Features.Admin;

public class AdminCustomerHandlerTests
{
    [Fact]
    public async Task UpdateAdminCustomer_UpdatesUnderlyingUser_ResolvedThroughMusteri()
    {
        using var context = TestDbContext.Create();
        var kullaniciId = Guid.NewGuid();
        var musteri = Musteri.Olustur(kullaniciId);
        context.Musteriler.Add(musteri);
        await context.SaveChangesAsync();

        var identityMock = new Mock<IIdentityService>();
        var handler = new UpdateAdminCustomerCommandHandler(context, identityMock.Object);

        var command = new UpdateAdminCustomerCommand(musteri.Id, "Yeni Ad", null, null, false);
        await handler.Handle(command, CancellationToken.None);

        // The Identity update must target the resolved KullaniciId — never the route/Musteri id directly.
        identityMock.Verify(x => x.UpdateManagedUserAsync(kullaniciId, "Yeni Ad", null, null, false, It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task UpdateAdminCustomer_ThrowsKeyNotFoundException_WhenMusteriIdDoesNotExist()
    {
        using var context = TestDbContext.Create();
        var identityMock = new Mock<IIdentityService>();
        var handler = new UpdateAdminCustomerCommandHandler(context, identityMock.Object);

        await Assert.ThrowsAsync<KeyNotFoundException>(() =>
            handler.Handle(new UpdateAdminCustomerCommand(Guid.NewGuid(), "Ad", null, null, null), CancellationToken.None));

        identityMock.Verify(x => x.UpdateManagedUserAsync(
            It.IsAny<Guid>(), It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>(), It.IsAny<bool?>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Fact]
    public async Task UpdateAdminCustomer_CannotBeReachedWithAnArbitraryIdentityUserId()
    {
        // Simulates the old vulnerable behaviour's attack surface: passing a
        // raw Identity user id (e.g. an Admin account's id) that has no
        // Musteri row must resolve to "not found", never to that account.
        using var context = TestDbContext.Create();
        var adminOnlyUserId = Guid.NewGuid(); // no Musteri row for this id
        var identityMock = new Mock<IIdentityService>();
        var handler = new UpdateAdminCustomerCommandHandler(context, identityMock.Object);

        await Assert.ThrowsAsync<KeyNotFoundException>(() =>
            handler.Handle(new UpdateAdminCustomerCommand(adminOnlyUserId, "Hacked", null, null, null), CancellationToken.None));

        identityMock.Verify(x => x.UpdateManagedUserAsync(
            adminOnlyUserId, It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>(), It.IsAny<bool?>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Fact]
    public async Task GetAdminCustomers_ExcludesIdentityUsersWithoutAMusteriRecord()
    {
        using var context = TestDbContext.Create();
        var customerKullaniciId = Guid.NewGuid();
        var musteri = Musteri.Olustur(customerKullaniciId);
        context.Musteriler.Add(musteri);
        await context.SaveChangesAsync();

        var adminOnlyId = Guid.NewGuid(); // no Musteri row — must never appear in the customer list
        var identityMock = new Mock<IIdentityService>();
        identityMock.Setup(x => x.FindByIdsAsync(It.Is<IEnumerable<Guid>>(ids => ids.Contains(customerKullaniciId)), It.IsAny<CancellationToken>()))
            .ReturnsAsync(new Dictionary<Guid, IdentityUserInfo>
            {
                [customerKullaniciId] = new IdentityUserInfo(customerKullaniciId, "cust@example.com", "Cust", "Omer", null, DateTime.UtcNow, true)
            });

        var handler = new GetAdminCustomers.GetAdminCustomersQueryHandler(context, identityMock.Object);
        var result = await handler.Handle(new GetAdminCustomers.GetAdminCustomersQuery(), CancellationToken.None);

        Assert.Single(result);
        Assert.Equal(musteri.Id, result[0].Id);
        Assert.DoesNotContain(result, r => r.KullaniciId == adminOnlyId);
    }

    [Fact]
    public void UpdateAdminCustomerCommandValidator_Rejects_EmptyUpdate()
    {
        var result = new UpdateAdminCustomerCommandValidator().TestValidate(
            new UpdateAdminCustomerCommand(Guid.NewGuid(), null, null, null, null));
        Assert.False(result.IsValid);
    }

    [Fact]
    public void UpdateAdminCustomerCommandValidator_Rejects_WhitespaceOnlyAd()
    {
        var result = new UpdateAdminCustomerCommandValidator().TestValidate(
            new UpdateAdminCustomerCommand(Guid.NewGuid(), "   ", null, null, null));
        result.ShouldHaveValidationErrorFor(x => x.Ad);
    }

    [Fact]
    public void UpdateAdminCustomerCommandValidator_Rejects_OversizedAd()
    {
        var result = new UpdateAdminCustomerCommandValidator().TestValidate(
            new UpdateAdminCustomerCommand(Guid.NewGuid(), new string('a', 101), null, null, null));
        result.ShouldHaveValidationErrorFor(x => x.Ad);
    }

    [Fact]
    public void UpdateAdminCustomerCommandValidator_Rejects_InvalidPhoneFormat()
    {
        var result = new UpdateAdminCustomerCommandValidator().TestValidate(
            new UpdateAdminCustomerCommand(Guid.NewGuid(), null, null, "not-a-phone!!", null));
        result.ShouldHaveValidationErrorFor(x => x.PhoneNumber);
    }

    [Fact]
    public void UpdateAdminCustomerCommandValidator_Accepts_IsActiveOnlyUpdate()
    {
        var result = new UpdateAdminCustomerCommandValidator().TestValidate(
            new UpdateAdminCustomerCommand(Guid.NewGuid(), null, null, null, false));
        Assert.True(result.IsValid);
    }
}
