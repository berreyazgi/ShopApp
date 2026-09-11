using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using KategoriServis.Domain.Common;

namespace KategoriServis.Domain.Entities;

[Table("UrunTipleri", Schema = "katalog")]
public class UrunVaryant : BaseEntity
{
    public Guid UrunId { get; set; }

    [Required]
    [MaxLength(300)]
    public string Ad { get; set; } = null!;

    public int StokAdeti { get; set; } = 0;

    [Required]
    [MaxLength(100)]
    public string StokKodu { get; set; } = null!;

    [Column(TypeName = "decimal(8, 2)")]
    public decimal FiyatFarki { get; set; }

    public bool AktifMi { get; set; } = true;

    public Urun Urun { get; set; } = null!;
    public ICollection<UrunOzelligi> Ozellikler { get; set; } = new List<UrunOzelligi>();
}
