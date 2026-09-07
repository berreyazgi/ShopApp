using System.ComponentModel.DataAnnotations;

namespace ShopApp.Application.Features.Authentication.DTOs;

public sealed class LoginRequest
{
    [Required, EmailAddress]
    public required string Email { get; set; }

    [Required, MinLength(1)]
    public required string Sifre { get; set; }
}
