using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using src.Monolith.ShopApp.Application.Common.Interfaces;

namespace ShopApp.Infrastructure.Authentication;

public class JwtTokenGenerator : IJwtTokenGenerator
{
    private readonly JwtSettings _settings;

   public JwtTokenGenerator(JwtSettings settings)
    {
        _settings = settings;
    }

 
    public string GenerateToken(string userId, string email, IEnumerable<string> roles)
    {
        var claims = new List<Claim>
        {
            // IdentityUser<Guid>'den gelen ID'yi NameIdentifier olarak ekliyoruz
            new Claim(ClaimTypes.NameIdentifier, userId),
            new Claim(ClaimTypes.Email, email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()) // Token benzersizliği için
        };

        // 2. Kullanıcının rollerini claim olarak ekliyoruz (Örn: Admin, User)
        foreach (var role in roles)
        {
            claims.Add(new Claim(ClaimTypes.Role, role));
        }

        // 3. appsettings.json dosyasından Gizli Anahtarı (Secret Key) okuyoruz
        var secretKey = !string.IsNullOrEmpty(_settings.SecretKey)
            ? _settings.SecretKey
            : throw new InvalidOperationException("JWT SecretKey is missing in JwtSettings configuration.");
            
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        // 4. Token ayarlarını ve süresini yapılandırıyoruz
        var expiryMinutes = Convert.ToDouble(_settings.ExpirationInMinutes);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddMinutes(expiryMinutes),
            Issuer = _settings.Issuer,
            Audience = _settings.Audience,
            SigningCredentials = credentials
        };

        // 5. Token'ı üretiyoruz
        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }


}

