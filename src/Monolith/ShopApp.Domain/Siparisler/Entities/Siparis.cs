using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using src.Monolith.ShopApp.Domain.Common;

namespace src.Monolith.ShopApp.Domain.Siparisler;

[Table("Siparisler", Schema = "sales")]
public class Siparis : BaseEntity
{
    [Required]
    public string MusteriId { get; private set; } = null!;

    [Required]
    public string SiparisNumarasi { get; private set; } = null!;

    public int DurumId { get; private set; }

    public SiparisDurumLookup Durum { get; private set; } = null!;
 
    public decimal AraToplam { get; private set; }

    public decimal IndirimOrani { get; private set; }

    public decimal KargoFiyat { get; private set; }

    public decimal ToplamFiyat { get; private set; }

    public ICollection<SiparisUrunleri> Urunler { get; private set; }
        = new List<SiparisUrunleri>();
    
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

    private void RecalculateTotals()
    {
        AraToplam = Urunler.Sum(x => x.UrunBirimFiyat* x.UrunMiktar);

        IndirimOrani= Urunler.Sum(x => x.IndirimOrani);

        ToplamFiyat = AraToplam - IndirimOrani + KargoFiyat;

        MarkAsUpdated();
    }
}