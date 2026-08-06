namespace src.Monolith.ShopApp.Application.Auth;

public class LoginRequest
{
    public required string Email { get; set;}
    public required string Sifre { get; set;} = null;

}