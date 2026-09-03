using src.Monolith.ShopApp.Domain.Common;

namespace src.Monolith.ShopApp.Domain.Siparisler;

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
}