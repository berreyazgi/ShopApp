namespace ShopApp.Application.Features.Authentication.DTOs;

public sealed record JwtToken(string AccessToken, DateTime ExpiresAt);
