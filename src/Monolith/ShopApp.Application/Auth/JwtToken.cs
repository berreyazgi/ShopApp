namespace ShopApp.Application.Auth;

public sealed record JwtToken(string AccessToken, DateTime ExpiresAt);
