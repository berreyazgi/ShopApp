using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using src.Monolith.ShopApp.Domain.Common;

namespace src.Monolith.ShopApp.Domain.Siparisler;

[Table("SiparisUrunleri", Schema = "sales")]
public class SiparisUrunleri : BaseEntity
{
    public Guid SiparisId { get; private set; }

    public Guid UrunTurId { get; private set; }

    [Required]
    [MaxLength(500)]
    public string UrunIsmi { get; private set; } = null!;
    public string? UrunAciklamasi { get; private set; }

    [MaxLength(500)]
    public string? StokTakipNumarasi { get; private set; }

    public int UrunMiktar { get; private set; }

    public decimal UrunBirimFiyat { get; private set; }

    public decimal IndirimOrani { get; private set; }

    public decimal ToplamFiyat { get; private set; }

    public Siparis Siparis { get; private set; } = null!;

    //encapsulation 
    private SiparisUrunleri() { }

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