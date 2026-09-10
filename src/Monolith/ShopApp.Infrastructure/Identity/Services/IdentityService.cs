using System.IdentityModel.Tokens.Jwt;
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
    // The only roles this application understands. Role-change operations are
    // restricted to this set — no new Identity role is ever created from
    // caller-supplied/request input, and only these roles are ever removed
    // when replacing a user's role (external/system roles, if any exist, are
    // left untouched).
    private static readonly string[] ManagedRoles = ["Admin", "User", "Musteri"];

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
        // The JWT bearer handler is configured with MapInboundClaims = false, so
        // inbound claims keep their original short names (e.g. "sub") instead of
        // being remapped to the long ClaimTypes.* URIs — mirrors AuthController.Me(),
        // which resolves the same subject the same way. ClaimTypes.NameIdentifier is
        // kept only as a defensive fallback for any other authentication scheme.
        var subject = _httpContextAccessor.HttpContext?.User?.FindFirstValue(JwtRegisteredClaimNames.Sub)
            ?? _httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.NameIdentifier);
        return Guid.TryParse(subject, out var result) ? result : null;
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

    public async Task<IReadOnlyDictionary<Guid, IdentityUserInfo>> FindByIdsAsync(IEnumerable<Guid> ids, CancellationToken cancellationToken = default)
    {
        var idList = ids.Distinct().ToList();
        if (idList.Count == 0)
            return new Dictionary<Guid, IdentityUserInfo>();

        var users = await _userManager.Users
            .Where(u => idList.Contains(u.Id))
            .ToListAsync(cancellationToken);

        return users.ToDictionary(u => u.Id, ToUserInfo);
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

    public async Task<int> CountUsersInRoleAsync(string role)
    {
        var users = await _userManager.GetUsersInRoleAsync(role);
        return users.Count;
    }

    public async Task SetRoleAsync(Guid userId, string role, CancellationToken cancellationToken = default)
    {
        var normalizedRole = role.Trim();
        if (!ManagedRoles.Contains(normalizedRole, StringComparer.OrdinalIgnoreCase))
            throw new InvalidOperationException("Desteklenmeyen rol.");

        var user = await GetRequiredUserAsync(userId);
        await using var transaction = await _dbContext.Database.BeginTransactionAsync(cancellationToken);

        var currentRoles = await _userManager.GetRolesAsync(user);
        var managedRolesToRemove = currentRoles
            .Where(r => ManagedRoles.Contains(r, StringComparer.OrdinalIgnoreCase))
            .ToArray();

        if (managedRolesToRemove.Length > 0)
            EnsureSucceeded(await _userManager.RemoveFromRolesAsync(user, managedRolesToRemove), "Önceki rol kaldırılamadı.");

        await EnsureRoleExistsAsync(normalizedRole);
        EnsureSucceeded(await _userManager.AddToRoleAsync(user, normalizedRole), "Rol atanamadı.");

        await EnsureProfileForRoleAsync(userId, normalizedRole);
        await _dbContext.SaveChangesAsync(cancellationToken);
        await transaction.CommitAsync(cancellationToken);
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

    public async Task UpdateManagedUserAsync(Guid id, string? ad, string? soyad, string? telefon, bool? isActive, CancellationToken cancellationToken = default)
    {
        var user = await GetRequiredUserAsync(id);

        if (!string.IsNullOrWhiteSpace(ad)) user.Ad = ad.Trim();
        if (!string.IsNullOrWhiteSpace(soyad)) user.Soyad = soyad.Trim();
        if (telefon != null) user.PhoneNumber = string.IsNullOrWhiteSpace(telefon) ? null : telefon.Trim();
        if (isActive.HasValue) user.Durum = isActive.Value ? "Aktif" : "Pasif";

        user.GuncellemeTarihi = DateTime.UtcNow;
        EnsureSucceeded(await _userManager.UpdateAsync(user), "Kullanıcı güncellenemedi.");
    }

    private async Task<KayitliKullanici> GetRequiredUserAsync(Guid userId) =>
        await _userManager.FindByIdAsync(userId.ToString())
            ?? throw new InvalidOperationException("Kimlik kullanıcısı bulunamadı.");

    private static IdentityUserInfo ToUserInfo(KayitliKullanici user) =>
        new(user.Id, user.Email!, user.Ad, user.Soyad, user.PhoneNumber, user.OlusturmaTarihi, string.Equals(user.Durum, "Aktif", StringComparison.OrdinalIgnoreCase));

    private async Task EnsureProfileForRoleAsync(Guid userId, string role)
    {
        // Admin authorization is derived purely from the native Identity role
        // membership (RoleManager / AspNetUserRoles) — no separate profile
        // entity is created for the "Admin" role.
        if (string.Equals(role, "User", StringComparison.OrdinalIgnoreCase)
            || string.Equals(role, "Musteri", StringComparison.OrdinalIgnoreCase))
        {
            if (!await _dbContext.Musteriler.AnyAsync(x => x.KullaniciId == userId))
                _dbContext.Musteriler.Add(Musteri.Olustur(userId));
        }
    }

    /// <summary>
    /// Provisions an application-managed role row if it doesn't already exist.
    /// Intentionally private: only ever called with one of the fixed <see cref="ManagedRoles"/>
    /// (registration's default role, or SetRoleAsync's already-allowlisted role) — never with
    /// arbitrary caller-supplied role names.
    /// </summary>
    private async Task EnsureRoleExistsAsync(string role)
    {
        if (await _roleManager.RoleExistsAsync(role))
            return;

        var result = await _roleManager.CreateAsync(new IdentityRole<Guid>(role));
        EnsureSucceeded(result, "Rol oluşturulamadı.");
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
