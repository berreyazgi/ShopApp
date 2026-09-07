using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ShopApp.Infrastructure.Identity.Models;
using ShopApp.Infrastructure.Persistence.Context;
using src.Monolith.ShopApp.Domain.Kullanici;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Application.Features.Authentication;
using ShopApp.Application.Features.Authentication.DTOs;

namespace ShopApp.Infrastructure.Identity.Services;

public sealed class IdentityService : IIdentityService
{
    private readonly UserManager<KayitliKullanici> _userManager;
    private readonly RoleManager<IdentityRole<Guid>> _roleManager;
    private readonly ShopAppDbContext _dbContext;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public IdentityService(
        UserManager<KayitliKullanici> userManager,
        RoleManager<IdentityRole<Guid>> roleManager,
        ShopAppDbContext dbContext,
        IHttpContextAccessor httpContextAccessor)
    {
        _userManager = userManager;
        _dbContext = dbContext;
        _roleManager = roleManager;
        _httpContextAccessor = httpContextAccessor;
    }

    public Guid? GetCurrentUserId()
    {
        var musteriId = _httpContextAccessor. HttpContext?.User?.FindFirstValue(ClaimTypes.NameIdentifier);
        return Guid.TryParse(musteriId, out var result) ? result : null;
    }

    public async Task<IdentityUserInfo?> FindByEmailAsync(string email)
    {
        var user = await _userManager.FindByEmailAsync(email);
        return user is null ? null : ToUserInfo(user);
    }

    public async Task<IdentityUserInfo?> FindByIdAsync(Guid id)
    {
        var user = await _userManager.FindByIdAsync(id.ToString());
        return user is null ? null : ToUserInfo(user);
    }

    public async Task<bool> CheckPasswordAsync(Guid userId, string password)
    {
        var user = await GetRequiredUserAsync(userId);
        if (!string.Equals(user.Durum, "Aktif", StringComparison.OrdinalIgnoreCase)
            || await _userManager.IsLockedOutAsync(user))
        {
            return false;
        }

        if (await _userManager.CheckPasswordAsync(user, password))
        {
            await _userManager.ResetAccessFailedCountAsync(user);
            return true;
        }

        await _userManager.AccessFailedAsync(user);
        return false;
    }

    public async Task<IdentityUserInfo> CreateWithRoleAsync(RegisterRequest request, string roleName)
    {
        await EnsureRoleExistsAsync(roleName);
        await using var transaction = await _dbContext.Database.BeginTransactionAsync();

        var now = DateTime.UtcNow;
        var user = new KayitliKullanici
        {
            UserName = request.Email,
            Email = request.Email,
            Ad = request.Ad,
            Soyad = request.Soyad,
            Durum = "Aktif",
            OlusturmaTarihi = now,
            GuncellemeTarihi = now
        };

        EnsureUserCreated(await _userManager.CreateAsync(user, request.Sifre));
        EnsureSucceeded(await _userManager.AddToRoleAsync(user, roleName), "Kullanıcı rolü atanamadı.");
        await EnsureProfileForRoleAsync(user.Id, roleName);
        await _dbContext.SaveChangesAsync();
        await transaction.CommitAsync();

        return ToUserInfo(user);
    }

    public async Task EnsureRoleExistsAsync(string role)
    {
        if (await _roleManager.RoleExistsAsync(role))
            return;

        var result = await _roleManager.CreateAsync(new IdentityRole<Guid>(role));
        EnsureSucceeded(result, "Rol oluşturulamadı.");
    }

    public async Task AddToRoleAsync(Guid userId, string role)
    {
        var user = await GetRequiredUserAsync(userId);
        await using var transaction = await _dbContext.Database.BeginTransactionAsync();

        if (!await _userManager.IsInRoleAsync(user, role))
            EnsureSucceeded(await _userManager.AddToRoleAsync(user, role), "Kullanıcı rolü atanamadı.");

        await EnsureProfileForRoleAsync(userId, role);
        await _dbContext.SaveChangesAsync();
        await transaction.CommitAsync();
    }

    public async Task<IReadOnlyCollection<string>> GetRolesAsync(Guid userId)
    {
        var user = await GetRequiredUserAsync(userId);
        return (await _userManager.GetRolesAsync(user)).ToArray();
    }

    public async Task UpdateProfileAsync(Guid id, string ad, string soyad, string? telefon)
    {
        var user = await GetRequiredUserAsync(id);
        user.Ad = ad;
        user.Soyad = soyad;
        user.PhoneNumber = string.IsNullOrWhiteSpace(telefon) ? null : telefon.Trim();
        user.GuncellemeTarihi = DateTime.UtcNow;

        var result = await _userManager.UpdateAsync(user);
        EnsureSucceeded(result, "Profil bilgileri güncellenemedi.");
    }

    private async Task<KayitliKullanici> GetRequiredUserAsync(Guid userId) =>
        await _userManager.FindByIdAsync(userId.ToString())
            ?? throw new InvalidOperationException("Kimlik kullanıcısı bulunamadı.");

    private static IdentityUserInfo ToUserInfo(KayitliKullanici user) =>
        new(user.Id, user.Email!, user.Ad, user.Soyad, user.PhoneNumber, user.OlusturmaTarihi);

    private async Task EnsureProfileForRoleAsync(Guid userId, string role)
    {
        if (string.Equals(role, "User", StringComparison.OrdinalIgnoreCase)
            || string.Equals(role, "Musteri", StringComparison.OrdinalIgnoreCase))
        {
            if (!await _dbContext.Musteriler.AnyAsync(x => x.KullaniciId == userId))
                _dbContext.Musteriler.Add(Musteri.Olustur(userId));

            return;
        }

        if (string.Equals(role, "Admin", StringComparison.OrdinalIgnoreCase)
            && !await _dbContext.AdminProfilleri.AnyAsync(x => x.KullaniciId == userId))
        {
            _dbContext.AdminProfilleri.Add(AdminProfile.Olustur(userId));
        }
    }

    private static void EnsureUserCreated(IdentityResult result)
    {
        if (result.Succeeded)
            return;

        if (result.Errors.Any(error => error.Code is "DuplicateUserName" or "DuplicateEmail"))
            throw new InvalidOperationException("Bu e-posta adresi zaten kullanılıyor.");

        throw new AuthenticationValidationException(result.Errors.Select(MapIdentityError));
    }

    private static string MapIdentityError(IdentityError error) => error.Code switch
    {
        "PasswordTooShort" => "Şifre en az 8 karakter olmalıdır.",
        "PasswordRequiresNonAlphanumeric" => "Şifre en az bir özel karakter içermelidir.",
        "PasswordRequiresDigit" => "Şifre en az bir rakam içermelidir.",
        "PasswordRequiresLower" => "Şifre en az bir küçük harf içermelidir.",
        "PasswordRequiresUpper" => "Şifre en az bir büyük harf içermelidir.",
        _ => "Kayıt bilgileri geçersiz. Lütfen alanları kontrol edin."
    };

    private static void EnsureSucceeded(IdentityResult result, string message)
    {
        if (!result.Succeeded)
            throw new InvalidOperationException(message);
    }
}
