using Microsoft.AspNetCore.Identity;
using ShopApp.Infrastructure.Identity;
using src.IJwtTokenGenerator.ShopApp.Application.Common.Interfaces;
using src.Monolith.ShopApp.Application.Auth;
using src.Monolith.ShopApp.Application.Common.Interfaces;
using src.Monolith.ShopApp.Application.Common.Models;

namespace ShopApp.Infrastructure.Services;

public class AuthService : IAuthService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<IdentityRole<Guid>> _roleManager;
    private readonly IJwtTokenGenerator _jwtTokenGenerator;

    public AuthService(
        UserManager<ApplicationUser> userManager,
        RoleManager<IdentityRole<Guid>> roleManager,
        IJwtTokenGenerator jwtTokenGenerator)
    {
        _userManager = userManager;
        _roleManager = roleManager;
        _jwtTokenGenerator = jwtTokenGenerator;
    }

    public async Task<AuthResponse> LoginAsync(LoginRequest request)
    {
        var user = await _userManager.FindByEmailAsync(request.Email)
            ?? throw new UnauthorizedAccessException("E-posta adresi veya şifre hatalı.");

        var isPasswordValid = await _userManager.CheckPasswordAsync(user, request.Sifre);
        if (!isPasswordValid)
            throw new UnauthorizedAccessException("E-posta adresi veya şifre hatalı.");

        var roles = await _userManager.GetRolesAsync(user);
        var token = _jwtTokenGenerator.GenerateToken(
            user.Id.ToString(),
            user.Email!,
            roles);

        return new AuthResponse
        {
            Token  = token,
            Email  = user.Email!,
            Ad     = user.Ad,
            Soyad  = user.Soyad,
            Role   = roles.ToList()
        };
    }

    public async Task<AuthResponse> RegisterAsync(RegisterRequest request)
    {
        var existingUser = await _userManager.FindByEmailAsync(request.Email);
        if (existingUser != null)
        {
            throw new InvalidOperationException("User with this email already exists.");
        }

        var newUser = new ApplicationUser
        {
            UserName = request.Email,
            Email = request.Email,
            Ad = request.Ad,
            Soyad = request.Soyad,
            durum = "Active",
            OlusturmaTarihi = DateTime.UtcNow.ToString("yyyy-MM-dd HH:mm:ss"),
            GuncellemeTarihi = DateTime.UtcNow.ToString("yyyy-MM-dd HH:mm:ss")
        };

        var createResult = await _userManager.CreateAsync(newUser, request.Sifre);
        if (!createResult.Succeeded)
        {
            throw new InvalidOperationException(
                $"Failed to create user: {string.Join(", ", createResult.Errors.Select(e => e.Description))}");
        }

        const string defaultRole = "User";
        if (!await _roleManager.RoleExistsAsync(defaultRole))
        {
            var roleResult = await _roleManager.CreateAsync(new IdentityRole<Guid>(defaultRole));
            if (!roleResult.Succeeded)
            {
                throw new InvalidOperationException(
                    $"Failed to create role '{defaultRole}': {string.Join(", ", roleResult.Errors.Select(e => e.Description))}");
            }
        }

        var addRoleResult = await _userManager.AddToRoleAsync(newUser, defaultRole);
        if (!addRoleResult.Succeeded)
        {
            throw new InvalidOperationException(
                $"Failed to add role '{defaultRole}': {string.Join(", ", addRoleResult.Errors.Select(e => e.Description))}");
        }

        var roles = await _userManager.GetRolesAsync(newUser);
        var token = _jwtTokenGenerator.GenerateToken(
            newUser.Id.ToString(),
            newUser.Email!,
            roles);

        return new AuthResponse
        {
            Token = token,
            Email = newUser.Email!,
            Ad = newUser.Ad,
            Soyad = newUser.Soyad,
            Role = roles.ToList()
        };
    }

}


