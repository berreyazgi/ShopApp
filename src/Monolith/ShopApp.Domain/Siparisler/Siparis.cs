using System.ComponentModel.DataAnnotations.Schema;
using src.Monolith.ShopApp.Domain.Common;

namespace src.Monolith.ShopApp.Domain.Siparisler;

public class Siparis : BaseEntity
{
    [ForeignKey("Musteri")]
    public string MusteriId { get; private set; } = null!;

    public string SiparisNumarasi { get; private set; } = null!;

    public SiparisDurum Status { get; private set; } = SiparisDurum.BekleyenOdeme;

    public decimal AraToplam { get; private set; }

    public decimal IndirimOrani{ get; private set; }

    public decimal KargoFiyat { get; private set; }

    public decimal ToplamFiyat { get; private set; }

    public ICollection<SiparisUrunleri> Urunler { get; private set; }
        = new List<SiparisUrunleri>();

    private Siparis()
    {
    }

    public Siparis(
        string musteriId,
        string SiparisNumarasi)
    {
        MusteriId = musteriId;
       this.SiparisNumarasi = SiparisNumarasi;
    }

    public void AddItem(
        Guid UrunCesidId,
        string UrunIsmi,
        string sku,
        int miktar,
        decimal unitPrice,
        decimal indirimOrani= 0)
    {
        SiparisUrunleri item = new(Id, UrunCesidId, UrunIsmi, sku, miktar, unitPrice, indirimOrani);

        Urunler.Add(item);

        RecalculateTotals();
    }

    public void SetKargoFiyat(decimal KargoFiyat)
    {
        if (KargoFiyat < 0)
            throw new ArgumentOutOfRangeException(
                nameof(KargoFiyat));

        this.KargoFiyat = KargoFiyat;
        RecalculateTotals();
    }

    public void MarkAsPaid()
    {
        Status = SiparisDurum.Odenmis;
        MarkAsUpdated();
    }

    public void Cancel()
    {
        if (Status is SiparisDurum.Gönderildi
            or SiparisDurum.TeslimEdildi)
        {
            throw new InvalidOperationException(
                "Kargoya verilmiş veya teslim edilmiş sipariş iptal edilemez.");
        }

        Status = SiparisDurum.IptalEdildi;
        MarkAsUpdated();
    }

    private void RecalculateTotals()
    {
        AraToplam = Urunler.Sum(x => x.UrunBirimFiyat* x.UrunMiktar);

        IndirimOrani= Urunler.Sum(x => x.IndirimOrani);

        ToplamFiyat = AraToplam - IndirimOrani + KargoFiyat;

        MarkAsUpdated();
    }
}