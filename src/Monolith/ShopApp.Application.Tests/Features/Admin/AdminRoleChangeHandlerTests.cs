using FluentValidation.TestHelper;
using Moq;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Application.Features.Admin.Roles.Commands.ChangeUserRole;
using ShopApp.Application.Features.Authentication.DTOs;
using Xunit;

namespace ShopApp.Application.Tests.Features.Admin;

public class AdminRoleChangeHandlerTests
{
    [Fact]
    public void ChangeUserRoleCommandValidator_Rejects_UnknownRole()
    {
        var result = new ChangeUserRoleCommandValidator().TestValidate(new ChangeUserRoleCommand(Guid.NewGuid(), "SuperRootGodMode"));
        result.ShouldHaveValidationErrorFor(x => x.Role);
    }

    [Theory]
    [InlineData("Admin")]
    [InlineData("User")]
    [InlineData("Musteri")]
    [InlineData("admin")]
    public void ChangeUserRoleCommandValidator_Accepts_AllowlistedRole(string role)
    {
        var result = new ChangeUserRoleCommandValidator().TestValidate(new ChangeUserRoleCommand(Guid.NewGuid(), role));
        result.ShouldNotHaveValidationErrorFor(x => x.Role);
    }

    [Fact]
    public async Task ChangeUserRole_ReplacesRole_NotAdds()
    {
        var targetId = Guid.NewGuid();
        var adminId = Guid.NewGuid();

        var identityMock = new Mock<IIdentityService>();
        identityMock.Setup(x => x.GetCurrentUserId()).Returns(adminId);
        identityMock.Setup(x => x.FindByIdAsync(targetId))
            .ReturnsAsync(new IdentityUserInfo(targetId, "user@example.com", "Ad", "Soyad"));
        identityMock.Setup(x => x.GetRolesAsync(targetId)).ReturnsAsync(["Admin"]);
        identityMock.Setup(x => x.CountUsersInRoleAsync("Admin")).ReturnsAsync(2); // not the last admin

        var handler = new ChangeUserRoleCommandHandler(identityMock.Object);
        await handler.Handle(new ChangeUserRoleCommand(targetId, "Musteri"), CancellationToken.None);

        // The handler must delegate to the replace-based SetRoleAsync — never an add-only call.
        identityMock.Verify(x => x.SetRoleAsync(targetId, "Musteri", It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task ChangeUserRole_ThrowsInvalidOperationException_WhenDemotingTheLastAdmin()
    {
        var targetId = Guid.NewGuid();
        var adminId = Guid.NewGuid();

        var identityMock = new Mock<IIdentityService>();
        identityMock.Setup(x => x.GetCurrentUserId()).Returns(adminId);
        identityMock.Setup(x => x.FindByIdAsync(targetId))
            .ReturnsAsync(new IdentityUserInfo(targetId, "user@example.com", "Ad", "Soyad"));
        identityMock.Setup(x => x.GetRolesAsync(targetId)).ReturnsAsync(["Admin"]);
        identityMock.Setup(x => x.CountUsersInRoleAsync("Admin")).ReturnsAsync(1); // the only admin

        var handler = new ChangeUserRoleCommandHandler(identityMock.Object);

        await Assert.ThrowsAsync<InvalidOperationException>(() =>
            handler.Handle(new ChangeUserRoleCommand(targetId, "Musteri"), CancellationToken.None));

        identityMock.Verify(x => x.SetRoleAsync(It.IsAny<Guid>(), It.IsAny<string>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Fact]
    public async Task ChangeUserRole_AllowsDemotion_WhenAnotherAdminRemains()
    {
        var targetId = Guid.NewGuid();
        var adminId = Guid.NewGuid();

        var identityMock = new Mock<IIdentityService>();
        identityMock.Setup(x => x.GetCurrentUserId()).Returns(adminId);
        identityMock.Setup(x => x.FindByIdAsync(targetId))
            .ReturnsAsync(new IdentityUserInfo(targetId, "user@example.com", "Ad", "Soyad"));
        identityMock.Setup(x => x.GetRolesAsync(targetId)).ReturnsAsync(["Admin"]);
        identityMock.Setup(x => x.CountUsersInRoleAsync("Admin")).ReturnsAsync(2);

        var handler = new ChangeUserRoleCommandHandler(identityMock.Object);
        await handler.Handle(new ChangeUserRoleCommand(targetId, "Musteri"), CancellationToken.None);

        identityMock.Verify(x => x.SetRoleAsync(targetId, "Musteri", It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task ChangeUserRole_ThrowsInvalidOperationException_WhenAdminChangesOwnRole()
    {
        var adminId = Guid.NewGuid();

        var identityMock = new Mock<IIdentityService>();
        identityMock.Setup(x => x.GetCurrentUserId()).Returns(adminId);

        var handler = new ChangeUserRoleCommandHandler(identityMock.Object);

        await Assert.ThrowsAsync<InvalidOperationException>(() =>
            handler.Handle(new ChangeUserRoleCommand(adminId, "Musteri"), CancellationToken.None));

        identityMock.Verify(x => x.FindByIdAsync(It.IsAny<Guid>()), Times.Never);
        identityMock.Verify(x => x.SetRoleAsync(It.IsAny<Guid>(), It.IsAny<string>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Fact]
    public async Task ChangeUserRole_ThrowsKeyNotFoundException_WhenTargetUserMissing()
    {
        var targetId = Guid.NewGuid();
        var adminId = Guid.NewGuid();

        var identityMock = new Mock<IIdentityService>();
        identityMock.Setup(x => x.GetCurrentUserId()).Returns(adminId);
        identityMock.Setup(x => x.FindByIdAsync(targetId)).ReturnsAsync((IdentityUserInfo?)null);

        var handler = new ChangeUserRoleCommandHandler(identityMock.Object);

        await Assert.ThrowsAsync<KeyNotFoundException>(() =>
            handler.Handle(new ChangeUserRoleCommand(targetId, "Musteri"), CancellationToken.None));
    }

    [Fact]
    public async Task ChangeUserRole_ThrowsUnauthorizedAccessException_WhenCurrentUserIdMissing()
    {
        var identityMock = new Mock<IIdentityService>();
        identityMock.Setup(x => x.GetCurrentUserId()).Returns((Guid?)null);

        var handler = new ChangeUserRoleCommandHandler(identityMock.Object);

        await Assert.ThrowsAsync<UnauthorizedAccessException>(() =>
            handler.Handle(new ChangeUserRoleCommand(Guid.NewGuid(), "Musteri"), CancellationToken.None));
    }
}
