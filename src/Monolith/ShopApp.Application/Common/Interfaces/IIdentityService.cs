using ShopApp.Application.Features.Authentication.DTOs;

namespace ShopApp.Application.Common.Interfaces;

public interface IIdentityService
{
    Task<IdentityUserInfo?> FindByEmailAsync(string email);
    Task<IdentityUserInfo?> FindByIdAsync(Guid id);
    Task<bool> CheckPasswordAsync(Guid id, string password);
    Task<IReadOnlyCollection<string>> GetRolesAsync(Guid id);
    Task<IdentityUserInfo> CreateWithRoleAsync(RegisterRequest request, string roleName);
    Task EnsureRoleExistsAsync(string roleName);
    Task AddToRoleAsync(Guid id, string roleName);
    Task UpdateProfileAsync(Guid id, string ad, string soyad, string? telefon);
    Guid? GetCurrentUserId();
}
