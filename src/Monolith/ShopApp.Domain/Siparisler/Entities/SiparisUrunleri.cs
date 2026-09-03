using src.Monolith.ShopApp.Domain.Common;

namespace src.Monolith.ShopApp.Domain.Siparisler;

public class SiparisUrunleri : BaseEntity
{
    public Guid SiparisId { get; private set; }

    public Guid UrunTurId { get; private set; }

    public string UrunIsmi { get; private set; } = null!;
    public string? UrunAciklamasi { get; private set; }

    public string? StokTakipNumarasi { get; private set; }

    public int UrunMiktar { get; private set; }

    public decimal UrunBirimFiyat { get; private set; }

    public decimal IndirimOrani { get; private set; }

    public decimal ToplamFiyat { get; private set; }

    public SiparisEntity SiparisEntity { get; private set; } = null!;

}