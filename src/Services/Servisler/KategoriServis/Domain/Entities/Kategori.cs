using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using KategoriServis.Domain.Common;

namespace KategoriServis.Domain.Entities;

[Table("Kategoriler", Schema = "katalog")]
public class Kategori : BaseEntity
{
    [Required]
    [MaxLength(200)]
    public string KategoriIsim { get; set; } = null!;

    [ForeignKey(nameof(UstKategoriId))]
    public Guid? UstKategoriId { get; set; }

    [MaxLength(2000)]
    public string? KategoriAciklamasi { get; set; }

    [MaxLength(1000)]
    public string? GorselUrl { get; set; }

    public bool AktifMi { get; set; } = true;

    // Navigation properties
    public Kategori? UstKategori { get; set; }
    public ICollection<Kategori> AltKategoriler { get; set; } = new List<Kategori>();
    public ICollection<Urun> Urunler { get; set; } = new List<Urun>();
}
