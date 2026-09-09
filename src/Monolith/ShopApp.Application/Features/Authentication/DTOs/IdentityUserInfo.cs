namespace ShopApp.Application.Features.Authentication.DTOs;

public sealed record IdentityUserInfo(
    Guid Id,
    string Email,
    string Ad,
    string Soyad,
    string? Telefon = null,
    DateTime? OlusturmaTarihi = null,
    bool IsActive = true);
