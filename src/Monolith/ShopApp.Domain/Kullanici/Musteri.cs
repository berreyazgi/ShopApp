using src.Monolith.ShopApp.Domain.Common;

namespace src.Monolith.ShopApp.Domain.Kullanici;

public class Musteri : BaseEntity
{
    
    public string? Cinsiyet { get; set; }
    public string? DogumTarihi { get; set; }
    public string Email { get; set; } = null!;

    
}   