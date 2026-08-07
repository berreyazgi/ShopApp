using src.Monolith.ShopApp.Application.Auth;
using src.Monolith.ShopApp.Application.Common.Models;

namespace src.Monolith.ShopApp.Application.Common.Interfaces;

public interface IAuthService
{
    Task<AuthResponse> RegisterAsync(RegisterRequest request);
    Task<AuthResponse> LoginAsync(LoginRequest request);
    Task RegisterAsync(Microsoft.AspNetCore.Identity.Data.RegisterRequest request);
}

