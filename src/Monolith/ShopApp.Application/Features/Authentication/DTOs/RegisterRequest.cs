using System.ComponentModel.DataAnnotations;

namespace ShopApp.Application.Features.Authentication.DTOs;

public sealed class RegisterRequest
{
    [Required, StringLength(500, MinimumLength = 1)]
    public required string Ad { get; set; }

    [Required, StringLength(500, MinimumLength = 1)]
    public required string Soyad { get; set; }

    [Required, EmailAddress]
    public required string Email { get; set; }

    [Required, MinLength(8)]
    public required string Sifre { get; set; }
}
