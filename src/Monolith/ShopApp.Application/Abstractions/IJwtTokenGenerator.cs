namespace ShopApp.Application.Abstractions;
public interface IJwtTokenGenerator 
{
    //dışarıya sunulan bir method, kullanıcı id, email ve roller alır ve bir JWT token döndürür
    string GenerateToken(string userId, string email, IEnumerable<string> roles);
    
}
