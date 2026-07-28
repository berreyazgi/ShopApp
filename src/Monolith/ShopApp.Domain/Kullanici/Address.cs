using src.Monolith.ShopApp.Domain.Common;

namespace src.Monolith.ShopApp.Domain.Kullanici;

public class Address : BaseEntity
{
    public Guid MusteriId { get; private set; }

    public string AddressBilgisi { get; private set; } = null!;
    public string Ulke { get; private set; } = null!;
    public string Sehir { get; private set; } = null!;
    public string PostaKodu { get; private set; } = null!;
    public string Ilce { get; private set; } = null!;
    public string TamAdres { get; private set; } = null!;

    public Musteri Musteri { get; private set; } = null!;

    private Address( Guid MusteriId, string Ulke, string Ilce, string TamAdres, string Sehir, string PostaKodu, string AddressBilgisi)
    {
        this.MusteriId = MusteriId;
        this.Ulke = Ulke;
        this.Ilce = Ilce;
        this.TamAdres = TamAdres;
        this.Sehir = Sehir;
        this.PostaKodu = PostaKodu;
        this.AddressBilgisi = AddressBilgisi;
    }
    
}