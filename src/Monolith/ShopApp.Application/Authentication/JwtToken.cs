namespace ShopApp.Application.Authentication;

public sealed record JwtToken(string AccessToken, DateTime ExpiresAt);
