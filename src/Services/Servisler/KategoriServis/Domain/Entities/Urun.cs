using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using KategoriServis.Domain.Common;

namespace KategoriServis.Domain.Entities;

[Table("Urunler", Schema = "katalog")]
public class Urun : BaseEntity
{
    public Guid KategoriId { get; set; }

    [Required]
    [MaxLength(300)]
    public string UrunIsmi { get; set; } = null!;

    [MaxLength(4000)]
    public string? UrunAciklamasi { get; set; }

    [Column(TypeName = "decimal(8, 2)")]    
    public decimal Fiyat { get; set; }

    [Required]
    [MaxLength(200)]
    public string MarkaIsmi { get; set; } = null!;

    [Column(TypeName = "decimal(8, 2)")]    
    public decimal FiyatGecmis { get; set; }

    [MaxLength(1000)]
    public string? GorselUrl { get; set; }

    public bool AktifMi { get; set; } = true;

    // Navigation properties
    public Kategori Kategori { get; set; } = null!;
    public ICollection<UrunTipi> UrunTipleri { get; set; } = new List<UrunTipi>();
    public ICollection<UrunGorseli> Gorseller { get; set; } = new List<UrunGorseli>();
}
