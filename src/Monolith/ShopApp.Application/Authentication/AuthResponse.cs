namespace ShopApp.Application.Authentication;

public sealed class AuthResponse
{
    public required string AccessToken { get; init; }
    public required DateTime ExpiresAt { get; init; }
    public required CurrentUserResponse User { get; init; }
}
