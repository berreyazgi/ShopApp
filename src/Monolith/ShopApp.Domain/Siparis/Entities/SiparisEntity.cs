using src.Monolith.ShopApp.Domain.Common;
using src.Monolith.ShopApp.Domain.Siparis.Enums;

namespace src.Monolith.ShopApp.Domain.Siparis.Entities;

public class SiparisEntity : BaseEntity
{

    public Guid MusteriId { get; private set; }
    
    public string SiparisNumarasi { get; private set; } = null!;

    public int DurumId { get; private set; }

    public SiparisDurumLookup Durum { get; private set; } = null!;

    public decimal AraToplam { get; private set; }

    public decimal IndirimTutari { get; private set; }

    public decimal KargoFiyat { get; private set; }

    public decimal ToplamFiyat { get; private set; }

    public ICollection<SiparisUrunleri> Urunler { get; private set; } = [];

    private SiparisEntity() { }

    public static SiparisEntity Olustur(Guid musteriId, string siparisNumarasi, Guid olusturanKullaniciId) => new()
    {
        MusteriId = musteriId,
        SiparisNumarasi = siparisNumarasi,
        DurumId = (int)SiparisDurum.BekleyenOdeme,
        OlusturanKullaniciId = olusturanKullaniciId
    };

    public void DurumGuncelle(int yeniDurumId, Guid guncelleyenKullaniciId)
    {
        DurumId = yeniDurumId;
        GuncelleyenKullaniciId = guncelleyenKullaniciId;
        MarkAsUpdated();
    }

    public void ToplamlariGuncelle(decimal araToplam, decimal indirimTutari, decimal kargoFiyat)
    {
        AraToplam = araToplam;
        IndirimTutari = indirimTutari;
        KargoFiyat = kargoFiyat;
        ToplamFiyat = araToplam - indirimTutari + kargoFiyat;
    }

    public SiparisUrunleri UrunEkle(
        Guid urunTurId,
        Guid urunId,
        string urunIsmi,
        string? urunAciklamasi,
        string? stokTakipNumarasi,
        int urunMiktar,
        decimal urunBirimFiyat,
        decimal indirimOrani,
        Guid olusturanKullaniciId)
    {
        var urun = SiparisUrunleri.Olustur(
            Id,
            urunId,
            urunTurId,
            urunIsmi,
            urunAciklamasi,
            stokTakipNumarasi,
            urunMiktar,
            urunBirimFiyat,
            indirimOrani,
            olusturanKullaniciId);
        Urunler.Add(urun);
        return urun;
    }

    public void UrunSil(SiparisUrunleri urun)
    {
        Urunler.Remove(urun);
    }
}