using MediatR;
using ShopApp.Application.Common.Interfaces;

namespace ShopApp.Application.Features.Admin.Roles.Commands.ChangeUserRole;

public sealed class ChangeUserRoleCommandHandler(IIdentityService identityService)
    : IRequestHandler<ChangeUserRoleCommand>
{
    public async Task Handle(ChangeUserRoleCommand request, CancellationToken cancellationToken)
    {
        // Never fall back to a default/blank actor — if the acting admin's id
        // can't be resolved, fail closed instead of silently proceeding.
        var currentUserId = identityService.GetCurrentUserId()
            ?? throw new UnauthorizedAccessException("Kimlik doğrulanamadı.");

        // An admin can never change their own role from this endpoint —
        // regardless of how many other admins exist.
        if (currentUserId == request.UserId)
            throw new InvalidOperationException("Kendi rolünüzü bu uç noktadan değiştiremezsiniz.");

        var targetUser = await identityService.FindByIdAsync(request.UserId)
            ?? throw new KeyNotFoundException($"Kullanıcı '{request.UserId}' bulunamadı.");
        _ = targetUser;

        var currentRoles = await identityService.GetRolesAsync(request.UserId);
        var isCurrentlyAdmin = currentRoles.Contains("Admin", StringComparer.OrdinalIgnoreCase);
        var isDemotingFromAdmin = isCurrentlyAdmin && !string.Equals(request.Role, "Admin", StringComparison.OrdinalIgnoreCase);

        if (isDemotingFromAdmin)
        {
            var adminCount = await identityService.CountUsersInRoleAsync("Admin");
            if (adminCount <= 1)
                throw new InvalidOperationException("Son yönetici rolden alınamaz.");
        }

        await identityService.SetRoleAsync(request.UserId, request.Role, cancellationToken);
    }
}
