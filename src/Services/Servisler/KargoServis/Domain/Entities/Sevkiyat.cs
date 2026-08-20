using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using KargoServis.Domain.Common;

namespace KargoServis.Domain.Entities;

[Table("Sevkiyat", Schema = "kargo")]
public class Sevkiyat : BaseEntity
{
    [Required]
    [MaxLength(200)]
    public string SevkiyatTanım { get; set; } = null!;

    [MaxLength(1000)]
    public string? TakipUrlSablonu { get; set; }

    public bool AktifMi { get; set; } = true;

    // Navigation property
    public ICollection<KargoGonderisi> Gonderiler { get; set; } = new List<KargoGonderisi>();
}
