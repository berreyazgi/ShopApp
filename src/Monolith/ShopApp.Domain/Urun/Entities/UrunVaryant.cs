using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using src.Monolith.ShopApp.Domain.Common;

namespace ShopApp.Domain.Urun.Entities;

public class UrunVaryant : BaseEntity
{
    public Guid UrunId { get; set; }

    [MaxLength(50)]
    public string? Beden { get; set; }

    [MaxLength(100)]
    public string? Renk { get; set; }

    public int StokAdet { get; set; } = 0;

    [Required]
    [MaxLength(100)]
    public string StokKod { get; set; } = null!;

    [Column(TypeName = "decimal(8, 2)")]
    public decimal FiyatFarki { get; set; }

    public bool AktifMi { get; set; } = true;

    public Urun Urun { get; set; } = null!;
    
}