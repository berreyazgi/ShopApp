using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using KategoriServis.Domain.Common;

namespace KategoriServis.Domain.Entities;

[Table("UrunOzellikleri", Schema = "katalog")]
public class UrunOzelligi : BaseEntity
{
    [Column("UrunTipiId")]
    public Guid UrunVaryantId { get; set; }

    [Required]
    [MaxLength(200)]
    public string OzellikAdi { get; set; } = null!;

    [Required]
    [MaxLength(500)]
    public string Degeri { get; set; } = null!;

    // Navigation property
    public UrunVaryant UrunVaryant { get; set; } = null!;

    public UrunOzelligi(string ozellikAdi, string degeri, Guid urunVaryantId)
    {
        OzellikAdi = ozellikAdi;
        Degeri = degeri;
        UrunVaryantId = urunVaryantId;
    }
}
