using ShopApp.Application.Authentication;

namespace ShopApp.Application.Authentication.Services;

public interface IJwtTokenGenerator
{
    JwtToken GenerateToken(string userId, string email, string name, IEnumerable<string> roles);
}
