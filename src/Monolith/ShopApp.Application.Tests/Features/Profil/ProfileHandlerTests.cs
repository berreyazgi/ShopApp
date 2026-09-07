using FluentValidation.TestHelper;
using Moq;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Application.Features.Authentication.DTOs;
using ShopApp.Application.Features.Profil.Commands.UpdateMyProfile;
using ShopApp.Application.Features.Profil.Dtos;
using ShopApp.Application.Features.Profil.Queries.GetMyProfile;
using ShopApp.Application.Tests.TestSupport;
using Xunit;

namespace ShopApp.Application.Tests.Features.Profil;

public class ProfileHandlerTests
{
    [Fact]
    public async Task GetMyProfile_ReturnsCorrectUserProfileDto()
    {
        var userId = Guid.NewGuid();
        var musteriId = Guid.NewGuid();
        var customer = new CurrentCustomer(musteriId, userId);
        var customerContext = CustomerContextFactory.For(customer);

        var identityMock = new Mock<IIdentityService>();
        var userCreatedAt = new DateTime(2025, 1, 15, 10, 30, 0, DateTimeKind.Utc);
        identityMock.Setup(x => x.FindByIdAsync(userId))
            .ReturnsAsync(new IdentityUserInfo(userId, "berre@example.com", "Berre", "Yazgı", "+90 555 123 45 67", userCreatedAt));

        var handler = new GetMyProfile.GetMyProfileQueryHandler(customerContext.Object, identityMock.Object);

        var result = await handler.Handle(new GetMyProfile.GetMyProfileQuery(), CancellationToken.None);

        Assert.NotNull(result);
        Assert.Equal(userId, result.Id);
        Assert.Equal(musteriId, result.MusteriId);
        Assert.Equal("Berre", result.FirstName);
        Assert.Equal("Yazgı", result.LastName);
        Assert.Equal("Berre Yazgı", result.FullName);
        Assert.Equal("berre@example.com", result.Email);
        Assert.Equal("+90 555 123 45 67", result.Phone);
        Assert.Equal(userCreatedAt, result.CreatedAt);
    }

    [Fact]
    public async Task GetMyProfile_ThrowsKeyNotFoundException_WhenUserMissing()
    {
        var userId = Guid.NewGuid();
        var musteriId = Guid.NewGuid();
        var customer = new CurrentCustomer(musteriId, userId);
        var customerContext = CustomerContextFactory.For(customer);

        var identityMock = new Mock<IIdentityService>();
        identityMock.Setup(x => x.FindByIdAsync(userId))
            .ReturnsAsync((IdentityUserInfo?)null);

        var handler = new GetMyProfile.GetMyProfileQueryHandler(customerContext.Object, identityMock.Object);

        await Assert.ThrowsAsync<KeyNotFoundException>(() =>
            handler.Handle(new GetMyProfile.GetMyProfileQuery(), CancellationToken.None));
    }

    [Fact]
    public void UpdateMyProfileCommandValidator_ValidatesRules()
    {
        var validator = new UpdateMyProfileCommandValidator();

        var invalidModel = new UpdateMyProfileCommand("", "", new string('1', 55));
        var result = validator.TestValidate(invalidModel);

        result.ShouldHaveValidationErrorFor(x => x.Ad);
        result.ShouldHaveValidationErrorFor(x => x.Soyad);
        result.ShouldHaveValidationErrorFor(x => x.Telefon);

        var validModel = new UpdateMyProfileCommand("Berre", "Yazgı", "+90 555 123 45 67");
        var validResult = validator.TestValidate(validModel);
        validResult.ShouldNotHaveAnyValidationErrors();
    }
}
