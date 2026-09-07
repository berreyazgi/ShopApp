using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using src.Monolith.ShopApp.Domain.Common;

namespace ShopApp.Domain.Urun.Entities;

public class Urun : BaseEntity
{
    public Guid KategoriId { get; set; }

    [Required]
    public string UrunAd { get; set; } = null!;
    
    public string? Detay { get; set; }

    [Column(TypeName = "decimal(8, 2)")]    
    public decimal Fiyat { get; set; }

    [Required]
    public string MarkaAd { get; set; } = null!;

    [Column(TypeName = "decimal(8, 2)")]    
    public decimal GecmisFiyat { get; set; }
    
    public string? GorselUrl { get; set; }

    public bool AktifMi { get; set; } = true;

    // Navigation properties
    public Kategori Kategori { get; set; } = null!;
    public ICollection<UrunTur> UrunTurleri { get; set; } = new List<UrunTur>();
    public ICollection<UrunGorsel> Gorseller { get; set; } = new List<UrunGorsel>();
}
