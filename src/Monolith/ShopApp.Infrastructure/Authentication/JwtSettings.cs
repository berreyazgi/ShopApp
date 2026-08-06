namespace ShopApp.Infrastructure.Authentication;
public class JwtSettings
{
    //jwt secret key, issuer, audience ve token expiration süresi gibi ayarları tutan bir sınıf
    public const string SectionName = "JwtSettings";

    public string SecretKey { get; init; } = string.Empty;
    public string Issuer { get; init; } = string.Empty;
    public string Audience { get; init; } = string.Empty;
    public int ExpirationInMinutes { get; init; }
}