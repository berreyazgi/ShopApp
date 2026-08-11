using System.ComponentModel.DataAnnotations.Schema;
using src.Monolith.ShopApp.Domain.Common;

namespace src.Monolith.ShopApp.Domain.Siparisler;

public class SiparisUrunleri : BaseEntity
{
    [ForeignKey("Siparis")]
    public Guid SiparisId { get; private set; }

    public Guid UrunTurId { get; private set; }

    public string UrunIsmi { get; private set; } = null!;
    public string? UrunAciklamasi { get; private set; }

    public string? StokTakipNumarasi { get; private set; } 

    public int UrunMiktar { get; private set; }

    public decimal UrunBirimFiyat { get; private set; }

    public decimal IndirimOrani { get; private set; }

    public decimal ToplamFiyat { get; private set; }

    public Siparis Siparis { get; private set; } = null!;

    private SiparisUrunleri()
    {
    }

    internal SiparisUrunleri(
        Guid SiparisId,
        Guid UrunTurId,
        string UrunIsmi,
        string StokTakipNumarasi,
        int UrunMiktar,
        decimal UrunBirimFiyat,
        decimal IndirimOrani)
    {
        if (UrunMiktar <= 0)
            throw new ArgumentOutOfRangeException(
                nameof(UrunMiktar));

        if (UrunBirimFiyat < 0)
            throw new ArgumentOutOfRangeException(
                nameof(UrunBirimFiyat));

        if (IndirimOrani < 0)
            throw new ArgumentOutOfRangeException(
                nameof(IndirimOrani));

        this.SiparisId = SiparisId;
        this.UrunTurId = UrunTurId;
        this.UrunIsmi = UrunIsmi;
        this.StokTakipNumarasi = StokTakipNumarasi;
        this.UrunMiktar = UrunMiktar;
        this.UrunBirimFiyat = UrunBirimFiyat;
        this.IndirimOrani = IndirimOrani;

        ToplamFiyat =
            UrunBirimFiyat * UrunMiktar -
            IndirimOrani;
    }
}