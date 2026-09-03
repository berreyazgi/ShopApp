using ShopApp.Application.Authentication;

namespace ShopApp.Application.Abstractions;

public interface IIdentityService
{
    Task<IdentityUserInfo?> FindByEmailAsync(string email);
    Task<IdentityUserInfo?> FindByIdAsync(Guid id);
    Task<bool> CheckPasswordAsync(Guid id, string password);
    Task<IReadOnlyCollection<string>> GetRolesAsync(Guid id);
    Task<IdentityUserInfo> CreateWithRoleAsync(RegisterRequest request, string roleName);
    Task EnsureRoleExistsAsync(string roleName);
    Task AddToRoleAsync(Guid id, string roleName);
    Guid? GetCurrentUserId();
}
