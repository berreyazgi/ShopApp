using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using src.Monolith.ShopApp.Domain.Common;

namespace src.Monolith.ShopApp.Domain.Kullanici;

[Table("Adresler", Schema = "kimlik")]
public class Address : BaseEntity
{
    public Guid MusteriId { get; private set; }

    [MaxLength(5000)]
    public string? AdresBilgisi { get; private set; }

    public int Ulke { get; private set; }

    public int Sehir { get; private set; }

    [MaxLength(10)]
    public string PostaKodu { get; private set; } = null!;

    public int Ilce { get; private set; }

    [NotMapped]
    public string TamAdres { get; private set; } = null!;

    public Musteri Musteri { get; private set; } = null!;
    
    //efcore için boş bırakılıyor
    private Address() { }

    private Address(Guid musteriId, int ulke, int sehir, int ilce, string tamAdres, string postaKodu, string? adresBilgisi)
    {
        MusteriId = musteriId;
        Ulke = ulke;
        Ilce = ilce;
        TamAdres = tamAdres;
        Sehir = sehir;
        PostaKodu = postaKodu;
        AdresBilgisi = adresBilgisi;
    }

    public static Address Olustur(Guid musteriId, int ulke, int sehir, int ilce, string postaKodu, string? adresBilgisi, Guid olusturanKullaniciId) => new()
    {
        MusteriId = musteriId,
        Ulke = ulke,
        Sehir = sehir,
        Ilce = ilce,
        PostaKodu = postaKodu,
        AdresBilgisi = adresBilgisi,
        OlusturanKullaniciId = olusturanKullaniciId,
        OlusturmaTarihi = DateTime.UtcNow
    };

    public void Guncelle(int ulke, int sehir, int ilce, string postaKodu, string? adresBilgisi, Guid guncelleyenKullaniciId)
    {
        Ulke = ulke;
        Sehir = sehir;
        Ilce = ilce;
        PostaKodu = postaKodu;
        AdresBilgisi = adresBilgisi;
        GuncelleyenKullaniciId = guncelleyenKullaniciId;
        MarkAsUpdated();
    }
}