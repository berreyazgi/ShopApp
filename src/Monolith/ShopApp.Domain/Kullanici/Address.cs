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

    [MaxLength(13)]
    public string? Telefon { get; private set; }

    public int Ulke { get; private set; }

    public int Sehir { get; private set; }

    public int PostaKodu { get; private set; }

    public int Ilce { get; private set; }

    public int Mahalle { get; private set; }

    public Musteri Musteri { get; private set; } = null!;

    private Address() { }

    public static Address Olustur(Guid musteriId, int ulke, int sehir, int ilce, int mahalle, int postaKodu, string? adresBilgisi, Guid olusturanKullaniciId, string? telefon = null) => new()
    {
        MusteriId = musteriId,
        Ulke = ulke,
        Sehir = sehir,
        Ilce = ilce,
        Mahalle = mahalle,
        PostaKodu = postaKodu,
        AdresBilgisi = adresBilgisi,
        Telefon = telefon,
        OlusturanKullaniciId = olusturanKullaniciId,
        OlusturmaTarihi = DateTime.UtcNow
    };

    public void Guncelle(int ulke, int sehir, int ilce, int mahalle, int postaKodu, string? adresBilgisi, Guid guncelleyenKullaniciId, string? telefon = null)
    {
        Ulke = ulke;
        Sehir = sehir;
        Ilce = ilce;
        Mahalle = mahalle;
        PostaKodu = postaKodu;
        AdresBilgisi = adresBilgisi;
        Telefon = telefon;
        GuncelleyenKullaniciId = guncelleyenKullaniciId;
        MarkAsUpdated();
    }
}