using ShopApp.Application.Features.Authentication.DTOs;

namespace ShopApp.Application.Common.Interfaces;

public interface IJwtTokenGenerator
{
    JwtToken GenerateToken(string userId, string email, string name, IEnumerable<string> roles);
}
