namespace ShopApp.Application.Authentication;

public sealed record IdentityUserInfo(
    Guid Id,
    string Email,
    string Ad,
    string Soyad);
