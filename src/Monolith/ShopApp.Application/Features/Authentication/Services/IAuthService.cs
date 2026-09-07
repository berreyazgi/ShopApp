using ShopApp.Application.Features.Authentication.DTOs;

namespace ShopApp.Application.Features.Authentication.Services;

public interface IAuthService
{
    Task<AuthResponse> RegisterAsync(RegisterRequest request);
    Task<AuthResponse> LoginAsync(LoginRequest request);
    Task<CurrentUserResponse> GetCurrentUserAsync(Guid userId);
}
