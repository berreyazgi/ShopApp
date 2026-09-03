using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShopApp.Application.Authentication.Services;
using ShopApp.Application.Authentication;

namespace src.Monolith.ShopApp.Api.Controllers;

[ApiController]
[Route("api/admin")]
[Authorize(Roles = "Admin")]
public sealed class AdminController : ControllerBase
{
    private static readonly HashSet<string> AssignableRoles = new(StringComparer.OrdinalIgnoreCase)
    {
        "Admin", "User", "Musteri"
    };

    private readonly IIdentityService _identityService;

    public AdminController(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    // A minimal protected endpoint used by the SPA/admin integration until
    // business-specific administration endpoints are introduced.
    [HttpGet("session")]
    public IActionResult GetSession() => Ok(new { message = "Admin erişimi doğrulandı." });

    [HttpPost("users/{userId:guid}/roles")]
    public async Task<IActionResult> AssignRole(Guid userId, [FromBody] AssignRoleRequest request)
    {
        var role = request.Role.Trim();
        if (!AssignableRoles.Contains(role))
            return BadRequest(new { message = "Atanabilecek rol Admin, User veya Musteri olmalıdır." });

        try
        {
            await _identityService.EnsureRoleExistsAsync(role);
            await _identityService.AddToRoleAsync(userId, role);
            return NoContent();
        }
        catch (InvalidOperationException ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }
}
