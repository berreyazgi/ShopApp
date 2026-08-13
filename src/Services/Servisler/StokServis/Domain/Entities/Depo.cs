using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using StokServis.Domain.Common;

namespace StokServis.Domain.Entities;

[Table("Depolar", Schema = "stok")]
public class Depo : BaseEntity
{
    [Required]
    [MaxLength(200)]
    public string DepoIsmi { get; set; } = null!;

    [Required]
    [MaxLength(500)]
    public string DepoAdresi { get; set; } = null!;

    [Required]
    public int Sehir { get; set; }

    public bool AktifMi { get; set; } = true;

    // Navigation property
    public ICollection<StokUrunleri> StokKalemleri { get; set; } = new List<StokUrunleri>();
}
