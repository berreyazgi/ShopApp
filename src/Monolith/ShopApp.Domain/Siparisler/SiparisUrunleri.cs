using src.Monolith.ShopApp.Domain.Common;

namespace src.Monolith.ShopApp.Domain.Siparisler;

public class SiparisUrunleri : BaseEntity
{
    public Guid SiparisId { get; private set; }

    public Guid UrunCesidId { get; private set; }

    public string UrunIsmi { get; private set; } = null!;

    public string Sku { get; private set; } = null!;

    public int Miktar { get; private set; }

    public decimal BirimFiyat { get; private set; }

    public decimal IndirimOrani { get; private set; }

    public decimal ToplamFiyat { get; private set; }

    public Siparis Siparis { get; private set; } = null!;

    private SiparisUrunleri()
    {
    }

    internal SiparisUrunleri(
        Guid SiparisId,
        Guid UrunCesidId,
        string UrunIsmi,
        string sku,
        int Miktar,
        decimal BirimFiyat,
        decimal IndirimOrani)
    {
        if (Miktar <= 0)
            throw new ArgumentOutOfRangeException(
                nameof(Miktar));

        if (BirimFiyat < 0)
            throw new ArgumentOutOfRangeException(
                nameof(BirimFiyat));

        if (IndirimOrani < 0)
            throw new ArgumentOutOfRangeException(
                nameof(IndirimOrani));

        SiparisId = SiparisId;
        UrunCesidId = UrunCesidId;
        UrunIsmi = UrunIsmi;
        Sku = sku;
        Miktar = Miktar;
        BirimFiyat = BirimFiyat;
        IndirimOrani = IndirimOrani;

        ToplamFiyat =
            BirimFiyat * Miktar -
            IndirimOrani;
    }
}