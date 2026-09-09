using ShopApp.Application.Features.Authentication.DTOs;

namespace ShopApp.Application.Common.Interfaces;

public interface IIdentityService
{
    Task<IdentityUserInfo?> FindByEmailAsync(string email);
    Task<IdentityUserInfo?> FindByIdAsync(Guid id);

    /// <summary>Batch-resolves identity info for a set of user ids in one round trip (avoids N+1 lookups).</summary>
    Task<IReadOnlyDictionary<Guid, IdentityUserInfo>> FindByIdsAsync(IEnumerable<Guid> ids, CancellationToken cancellationToken = default);

    Task<bool> CheckPasswordAsync(Guid id, string password);
    Task<IReadOnlyCollection<string>> GetRolesAsync(Guid id);
    Task<IdentityUserInfo> CreateWithRoleAsync(RegisterRequest request, string roleName);

    /// <summary>Number of users currently holding the given role — used for last-admin protection.</summary>
    Task<int> CountUsersInRoleAsync(string role);

    /// <summary>
    /// Replaces the user's application-managed role (Admin/User/Musteri) with the given one —
    /// removes any previously-held managed roles first so privileges never accumulate.
    /// Only the fixed, known application roles may be passed; no new Identity role is ever created
    /// from caller-supplied input.
    /// </summary>
    Task SetRoleAsync(Guid userId, string role, CancellationToken cancellationToken = default);

    Task UpdateProfileAsync(Guid id, string ad, string soyad, string? telefon);

    /// <summary>Admin-driven update of another user's managed profile fields (Ad/Soyad/PhoneNumber/active status).</summary>
    Task UpdateManagedUserAsync(Guid id, string? ad, string? soyad, string? telefon, bool? isActive, CancellationToken cancellationToken = default);

    Guid? GetCurrentUserId();
}
