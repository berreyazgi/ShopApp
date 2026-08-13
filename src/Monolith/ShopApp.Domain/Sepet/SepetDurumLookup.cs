using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace src.Monolith.ShopApp.Domain.Sepet;

[Table("SepetDurumlari", Schema = "sales")]
public class SepetDurumLookup
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(50)]
    public string DurumIsmi { get; set; } = null!;
}
