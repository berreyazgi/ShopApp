using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using KargoServis.Domain.Common;
using KargoServis.Domain.Enums;

namespace KargoServis.Domain.Entities;

[Table("KargoGonderileri", Schema = "kargo")]
public class KargoGonderisi : BaseEntity
{
    public Guid SiparisId { get; set; }
    
    [Required]
    [MaxLength(50)]
    public string KargoSirketIsmi { get; set; }

    [MaxLength(150)]
    public string? TakipNumarasi { get; set; }

    public Guid? SevkiyatId { get; set; }

    public KargoDurumu Durum { get; set; } = KargoDurumu.Bekliyor;

    public DateOnly? TahminiTeslimTarihi { get; set; }

    [Required]
    public string TeslimatAdresiAnlikGoruntusu { get; set; } = "{}";

    // Navigation properties
    public Sevkiyat? Sevkiyat { get; set; }
    public ICollection<KargoDurumGecmisi> DurumGecmisi { get; set; } = new List<KargoDurumGecmisi>();
}
