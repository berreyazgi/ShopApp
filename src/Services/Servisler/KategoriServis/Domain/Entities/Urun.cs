using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using KategoriServis.Domain.Common;

namespace KategoriServis.Domain.Entities;

[Table("Urunler", Schema = "katalog")]
public class Urun : BaseEntity
{
    public Guid KategoriId { get; set; }

    [Required]
    public string UrunIsmi { get; set; } = null!;
    
    public string? UrunAciklamasi { get; set; }

    [Column(TypeName = "decimal(8, 2)")]    
    public decimal Fiyat { get; set; }

    [Required]
    public string MarkaIsmi { get; set; } = null!;

    [Column(TypeName = "decimal(8, 2)")]    
    public decimal FiyatGecmis { get; set; }
    
    public string? GorselUrl { get; set; }

    public bool AktifMi { get; set; } = true;

    // Navigation properties
    public Kategori Kategori { get; set; } = null!;
    public ICollection<UrunTur> UrunTurleri { get; set; } = new List<UrunTur>();
    public ICollection<UrunGorseli> Gorseller { get; set; } = new List<UrunGorseli>();
}
