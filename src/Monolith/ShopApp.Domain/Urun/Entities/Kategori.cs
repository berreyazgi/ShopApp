using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using src.Monolith.ShopApp.Domain.Common;

namespace ShopApp.Domain.Urun.Entities;

public class Kategori : BaseEntity
{
    [Required]
    public string KategoriAd { get; set; } = null!;

    [ForeignKey(nameof(UstKategoriId))]
    public Guid? UstKategoriId { get; set; }
    
    public string? Detay { get; set; }
    
    public string? GorselUrl { get; set; }

    public bool AktifMi { get; set; } = true;

    // Navigation properties
    public Kategori? UstKategori { get; set; }
    public ICollection<Kategori> AltKategoriler { get; set; } = new List<Kategori>();
    public ICollection<Urun> Urunler { get; set; } = new List<Urun>();
}
    