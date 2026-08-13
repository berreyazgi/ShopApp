using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using StokServis.Domain.Common;

namespace StokServis.Domain.Entities;

[Table("StokKalemleri", Schema = "stok")]
public class StokUrunleri : BaseEntity
{
    // KategoriServis içerisindeki UrunTipi'ne referans
    public Guid UrunTipiId { get; set; }

    [ForeignKey("DepoId")]
    [Required]
    public Guid DepoId { get; set; }

    [Required]
    [MaxLength(100)]
    public int StokUrunMiktar { get; set; }
    
    [Required]
    [MaxLength(100)]
    public int RezerveMiktar { get; set; }

    [NotMapped]
    public int KullanilabilirMiktar => StokUrunMiktar - RezerveMiktar;

    [MaxLength(100)]
    public string? DepoKonumu { get; set; }

    public int? YenidenSiparisSeviyesi { get; set; }

    // Navigation property
    public Depo Depo { get; set; } = null!;
    public ICollection<StokHareketi> Hareketler { get; set; } = new List<StokHareketi>();
}
