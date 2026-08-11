using ShopApp.Application.Auth;

namespace ShopApp.Application.Abstractions;

public interface IAuthService
{
    Task<AuthResponse> RegisterAsync(RegisterRequest request);
    Task<AuthResponse> LoginAsync(LoginRequest request);
    Task RegisterAsync(Microsoft.AspNetCore.Identity.Data.RegisterRequest request);
}

