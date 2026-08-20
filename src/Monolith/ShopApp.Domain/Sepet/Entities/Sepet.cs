using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using src.Monolith.ShopApp.Domain.Common;

namespace src.Monolith.ShopApp.Domain.Sepet.Entities;

[Table("Sepetler", Schema = "sales")]
public class Sepet : BaseEntity
{
    [Required]
    [MaxLength(500)]
    public string MusteriId { get; private set; }

    [ForeignKey(nameof(DurumId))]
    public int DurumId { get; private set; }
    
    public SepetDurumLookup Durum { get; private set; }

    public ICollection<SepetUrunu> Urunler { get; private set; } = [];

    private Sepet()
    {
    }

    public static Sepet Olustur(string musteriId, Guid olusturanKullaniciId) => new()
    {
        MusteriId = musteriId,
        DurumId = 1, // Aktif
        OlusturanKullaniciId = olusturanKullaniciId
    };
}
