namespace ShopApp.Application.Auth;

public sealed record CurrentUserResponse(
    Guid Id,
    string Email,
    string FirstName,
    string LastName,
    IReadOnlyCollection<string> Roles);
