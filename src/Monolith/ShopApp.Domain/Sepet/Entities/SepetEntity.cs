using src.Monolith.ShopApp.Domain.Common;
using src.Monolith.ShopApp.Domain.Sepet;

namespace src.Monolith.ShopApp.Domain.Sepet.Entities;

public class SepetEntity : BaseEntity
{
    public Guid MusteriId { get; private set; }

    public int DurumId { get; private set; }
    
    public SepetDurumLookup Durum { get; private set; }

    public ICollection<SepetUrunu> Urunler { get; private set; } = [];

    private SepetEntity(){}

    public static SepetEntity Olustur(Guid musteriId, Guid olusturanKullaniciId) => new()
    {
        MusteriId = musteriId,
        DurumId = (int)SepetDurum.Aktif,
        OlusturanKullaniciId = olusturanKullaniciId
    };

    public void DurumuGuncelle(int durumId, Guid guncelleyenKullaniciId)
    {
        DurumId = durumId;
        GuncelleyenKullaniciId = guncelleyenKullaniciId;
        MarkAsUpdated();
    }
}
