using System.ComponentModel.DataAnnotations;

namespace ShopApp.Application.Auth;

public sealed class AssignRoleRequest
{
    [Required]
    [StringLength(100, MinimumLength = 1)]
    public required string Role { get; init; }
}
