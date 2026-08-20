using ShopApp.Application.Authentication;

namespace ShopApp.Application.Abstractions;

public interface IJwtTokenGenerator
{
    JwtToken GenerateToken(string userId, string email, string name, IEnumerable<string> roles);
}
