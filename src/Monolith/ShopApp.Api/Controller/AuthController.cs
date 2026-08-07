using Microsoft.AspNetCore.Mvc;
using src.Monolith.ShopApp.Application.Auth;
using src.Monolith.ShopApp.Application.Common.Interfaces;

namespace src.Monolith.ShopApp.Api.Controller;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    /// <summary>
    /// Authenticates a user and returns a JWT access token.
    /// POST /api/auth/login
    /// </summary>
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        try
        {
            var response = await _authService.LoginAsync(request);
            return Ok(response);
        }
        catch (UnauthorizedAccessException ex)
        {
            return Unauthorized(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Beklenmeyen bir hata oluştu.", detail = ex.Message });
        }
    }

    /// <summary>
    /// Registers a new user account and returns a JWT access token.
    /// POST /api/auth/register
    /// </summary>
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        try
        {
            var response = await _authService.RegisterAsync(request);
            return Ok(response);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Beklenmeyen bir hata oluştu.", detail = ex.Message });
        }
    }
}