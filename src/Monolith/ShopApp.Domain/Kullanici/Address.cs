using System.ComponentModel.DataAnnotations.Schema;
using src.Monolith.ShopApp.Domain.Common;

namespace src.Monolith.ShopApp.Domain.Kullanici;

public class Address : BaseEntity
{
    [ForeignKey("Musteri")]
    public Guid MusteriId { get; private set; }

    public string? AddressBilgisi { get; private set; }
    public int Ulke { get; private set; }
    public int Sehir { get; private set; }
    public int PostaKodu { get; private set; }
    public int Ilce { get; private set; } 
    public string TamAdres { get; private set; } = null!;

    public Musteri Musteri { get; private set; } = null!;

    private Address( Guid MusteriId, int Ulke, int Sehir, int Ilce, string TamAdres, int PostaKodu, string AddressBilgisi)
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