using src.Monolith.ShopApp.Domain.Common;

namespace src.Monolith.ShopApp.Domain.Siparis.Entities;

public class SiparisUrunleri : BaseEntity
{
    public Guid SiparisId { get; private set; }

    public Guid UrunId { get; private set; }
    public Guid UrunTurId { get; private set; }

    public string UrunIsmi { get; private set; } = null!;
    public string? UrunAciklamasi { get; private set; }

    public string? StokTakipNumarasi { get; private set; }

    public int UrunMiktar { get; private set; }

    public decimal UrunBirimFiyat { get; private set; }

    public decimal IndirimOrani { get; private set; }

    public decimal ToplamFiyat { get; private set; }

    public SiparisEntity SiparisEntity { get; private set; } = null!;

    private SiparisUrunleri() { }

    public static SiparisUrunleri Olustur(
        Guid siparisId,
        Guid urunId,
        Guid urunTurId,
        string urunIsmi,
        string? urunAciklamasi,
        string? stokTakipNumarasi,
        int urunMiktar,
        decimal urunBirimFiyat,
        decimal indirimOrani,
        Guid olusturanKullaniciId) => new()
    {
        SiparisId = siparisId,
        UrunId = urunId,
        UrunTurId = urunTurId,
        UrunIsmi = urunIsmi,
        UrunAciklamasi = urunAciklamasi,
        StokTakipNumarasi = stokTakipNumarasi,
        UrunMiktar = urunMiktar,
        UrunBirimFiyat = urunBirimFiyat,
        IndirimOrani = indirimOrani,
        ToplamFiyat = urunBirimFiyat * urunMiktar * (1 - indirimOrani),
        OlusturanKullaniciId = olusturanKullaniciId
    };

    public void MiktarGuncelle(int urunMiktar, Guid guncelleyenKullaniciId)
    {
        UrunMiktar = urunMiktar;
        ToplamFiyat = UrunBirimFiyat * urunMiktar * (1 - IndirimOrani);
        GuncelleyenKullaniciId = guncelleyenKullaniciId;
        MarkAsUpdated();
    }
}