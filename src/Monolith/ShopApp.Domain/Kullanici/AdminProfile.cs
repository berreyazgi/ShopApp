using src.Monolith.ShopApp.Domain.Common;

namespace src.Monolith.ShopApp.Domain.Kullanici;

public class AdminProfile : BaseEntity
{
    public Guid KullaniciId { get; private set; }

    private AdminProfile()
    {
    }

    public static AdminProfile Olustur(Guid kullaniciId) => new()
    {
        KullaniciId = kullaniciId,
        OlusturanKullaniciId = kullaniciId
    };
}
