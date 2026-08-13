using src.Monolith.ShopApp.Domain.Common;

namespace src.Monolith.ShopApp.Domain.Kullanici;

public class Musteri : BaseEntity
{
    public Guid KullaniciId { get; private set; }

    public bool? Cinsiyet { get; set; }

    private Musteri()
    {
    }

    public static Musteri Olustur(Guid kullaniciId) => new()
    {
        KullaniciId = kullaniciId,
        OlusturanKullaniciId = kullaniciId
    };
}