using ShopApp.Application.Authentication;

namespace ShopApp.Application.Abstractions;

public sealed class AuthService : IAuthService
{
    private const string DefaultRole = "User";

    private readonly IIdentityService _identityService;
    private readonly IJwtTokenGenerator _jwtTokenGenerator;

    public AuthService(
        IIdentityService identityService,
        IJwtTokenGenerator jwtTokenGenerator)
    {
        _identityService = identityService;
        _jwtTokenGenerator = jwtTokenGenerator;
    }

    public async Task<AuthResponse> LoginAsync(LoginRequest request)
    {
        var user = await _identityService.FindByEmailAsync(request.Email.Trim())
            ?? throw new UnauthorizedAccessException("E-posta adresi veya şifre hatalı.");

        if (!await _identityService.CheckPasswordAsync(user.Id, request.Sifre))
            throw new UnauthorizedAccessException("E-posta adresi veya şifre hatalı.");

        var roles = await _identityService.GetRolesAsync(user.Id);
        return CreateAuthResponse(user, roles);
    }

    public async Task<AuthResponse> RegisterAsync(RegisterRequest request)
    {
        request.Email = request.Email.Trim();
        request.Ad = request.Ad.Trim();
        request.Soyad = request.Soyad.Trim();

        var existingUser = await _identityService.FindByEmailAsync(request.Email);
        if (existingUser is not null)
            throw new InvalidOperationException("Bu e-posta adresi zaten kullanılıyor.");

        var user = await _identityService.CreateWithRoleAsync(request, DefaultRole);

        var roles = await _identityService.GetRolesAsync(user.Id);
        return CreateAuthResponse(user, roles);
    }

    public async Task<CurrentUserResponse> GetCurrentUserAsync(Guid userId)
    {
        var user = await _identityService.FindByIdAsync(userId)
            ?? throw new UnauthorizedAccessException("Kullanıcı bulunamadı.");

        var roles = await _identityService.GetRolesAsync(user.Id);
        return CreateCurrentUserResponse(user, roles);
    }

    private AuthResponse CreateAuthResponse(IdentityUserInfo user, IReadOnlyCollection<string> roles)
    {
        var jwtToken = _jwtTokenGenerator.GenerateToken(
            user.Id.ToString(), user.Email, user.Ad, roles);

        return new AuthResponse
        {
            AccessToken = jwtToken.AccessToken,
            ExpiresAt = jwtToken.ExpiresAt,
            User = CreateCurrentUserResponse(user, roles)
        };
    }

    private static CurrentUserResponse CreateCurrentUserResponse(
        IdentityUserInfo user,
        IReadOnlyCollection<string> roles) =>
        new(user.Id, user.Email, user.Ad, user.Soyad, roles);
}
