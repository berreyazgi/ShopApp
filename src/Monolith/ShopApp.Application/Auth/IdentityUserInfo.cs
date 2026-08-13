namespace ShopApp.Application.Auth;

public sealed record IdentityUserInfo(
    Guid Id,
    string Email,
    string Ad,
    string Soyad);
