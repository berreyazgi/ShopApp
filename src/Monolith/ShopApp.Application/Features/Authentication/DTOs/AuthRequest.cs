namespace ShopApp.Application.Features.Authentication.DTOs;

public class AuthRequest
{
    public required string Token { get; set;}
    public required string Email { get; set;}
    public required string Ad{ get; set;}
    public required string Soyad{ get; set;}
    public List<string> Role { get; set;} = new List<string>();


}
