using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using KategoriServis.Domain.Common;

namespace KategoriServis.Domain.Entities;

[Table("UrunGorselleri", Schema = "katalog")]
public class UrunGorseli : BaseEntity
{
    public Guid UrunId { get; set; }

    [Required]
    public string GorselUrl { get; set; } = null!;

    public int GorselSiralamasi { get; set; }

    public Urun Urun { get; set; } = null!;
}
