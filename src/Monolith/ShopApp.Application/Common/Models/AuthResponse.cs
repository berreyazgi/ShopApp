namespace src.Monolith.ShopApp.Application.Common.Models;

public class AuthResponse
{
    //dto için gerekli alanlar
    public required string Token { get; set;} = string.Empty;
    public required string Email { get; set;} = string.Empty;
    public required string Ad{ get; set;}
     public required string Soyad{ get; set;}
    public List<string> Role { get; set;} = new List<string>();
}