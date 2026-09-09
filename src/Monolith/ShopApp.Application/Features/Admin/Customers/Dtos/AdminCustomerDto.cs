namespace ShopApp.Application.Features.Admin.Customers.Dtos;

/// <summary>
/// Admin dashboard projection of a customer. Deliberately excludes any
/// Identity security internals (password hash, security stamp, lockout
/// counters, refresh tokens, claims) — only the fields an admin list/detail
/// view needs.
/// </summary>
public sealed record AdminCustomerDto(
    Guid Id,
    Guid KullaniciId,
    string FullName,
    string Ad,
    string Soyad,
    string Email,
    string? PhoneNumber,
    bool IsActive,
    DateTime CreatedAt,
    int OrderCount
);
