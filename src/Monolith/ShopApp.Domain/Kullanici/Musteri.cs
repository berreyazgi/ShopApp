using src.Monolith.ShopApp.Domain.Common;

namespace src.Monolith.ShopApp.Domain.Kullanici;

public class Musteri : BaseEntity
{
    public string Cinsiyet { get; set; } = null!;
    public string DogumTarihi { get; set; } = null!;
    public string Email { get; set; } = null!;

    
}   