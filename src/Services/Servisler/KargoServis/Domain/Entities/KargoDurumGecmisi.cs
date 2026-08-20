using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using KargoServis.Domain.Common;
using KargoServis.Domain.Enums;

namespace KargoServis.Domain.Entities;

[Table("KargoDurumGecmisleri", Schema = "kargo")]
public class KargoDurumGecmisi : BaseEntity
{
    public Guid KargoGonderisiId { get; set; }

    public KargoDurumu Durum { get; set; }

    // Navigation property
    public KargoGonderisi KargoGonderisi { get; set; } = null!;
}
