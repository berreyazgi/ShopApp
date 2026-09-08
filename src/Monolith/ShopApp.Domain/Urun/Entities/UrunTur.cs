using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using src.Monolith.ShopApp.Domain.Common;

namespace ShopApp.Domain.Urun.Entities;

public class UrunTur : BaseEntity
{
    public Guid UrunId { get; set; }

    [Required]
    [MaxLength(300)]
    public string Ad { get; set; } = null!;

    public int StokAded { get; set; } = 0;

    [Required]
    [MaxLength(100)]
    public string StokKod { get; set; } = null!;

    [Column(TypeName = "decimal(8, 2)")]
    public decimal FiyatFarki { get; set; }

    public bool AktifMi { get; set; } = true;

    public Urun Urun { get; set; } = null!;
    public ICollection<UrunOzellik> Ozellikler { get; set; } = new List<UrunOzellik>();
    
}