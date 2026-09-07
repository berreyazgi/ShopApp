namespace ShopApp.Application.Features.Profil.Dtos;

public record UserProfileDto(
    Guid Id,
    Guid MusteriId,
    string FirstName,
    string LastName,
    string FullName,
    string Email,
    string? Phone,
    DateTime CreatedAt,
    string? AvatarUrl
);
