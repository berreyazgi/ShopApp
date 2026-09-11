using System.ComponentModel.DataAnnotations.Schema;
using src.Monolith.ShopApp.Domain.Common;

namespace src.Monolith.ShopApp.Domain.Sepet.Entities;

public class SepetUrunu : BaseEntity
{
    public Guid SepetId { get; private set; }
    public Guid UrunVaryantId { get; private set; }

    public int UrunMiktar { get; private set; }

    public decimal FiyatGecmis { get; private set; }

    public SepetEntity SepetEntity { get; private set; } = null!;

    private SepetUrunu() { }

    public static SepetUrunu Olustur(Guid sepetId, Guid urunVaryantId, int urunMiktar, decimal fiyatGecmis, Guid olusturanKullaniciId) => new()
    {
        SepetId = sepetId,
        UrunVaryantId = urunVaryantId,
        UrunMiktar = urunMiktar,
        FiyatGecmis = fiyatGecmis,
        OlusturanKullaniciId = olusturanKullaniciId
    };

    public void MiktarGuncelle(int urunMiktar, Guid guncelleyenKullaniciId)
    {
        UrunMiktar = urunMiktar;
        GuncelleyenKullaniciId = guncelleyenKullaniciId;
        MarkAsUpdated();
    }
}