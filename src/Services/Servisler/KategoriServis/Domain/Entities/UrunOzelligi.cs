using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using KategoriServis.Domain.Common;

namespace KategoriServis.Domain.Entities;

[Table("UrunOzellikleri", Schema = "katalog")]
public class UrunOzelligi : BaseEntity
{
    public Guid UrunTipiId { get; set; }

    [Required]
    [MaxLength(200)]
    public string OzellikAdi { get; set; } = null!;

    [Required]
    [MaxLength(500)]
    public string OzellikDegeri { get; set; } = null!;

    // Navigation property
    public UrunTipi UrunTipi { get; set; } = null!;

    public UrunOzelligi(string ozellikAdi, string ozellikDegeri, Guid urunTipiId)
    {
        OzellikAdi = ozellikAdi;
        OzellikDegeri = ozellikDegeri;
        UrunTipiId = urunTipiId;
    }
}
