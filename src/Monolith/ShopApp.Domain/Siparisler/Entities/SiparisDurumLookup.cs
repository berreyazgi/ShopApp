using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace src.Monolith.ShopApp.Domain.Siparisler;

[Table("SiparisDurum", Schema = "sales")]
public class SiparisDurumLookup
{
    [Key]
    public int Id { get; set; }
    
    [Required]
    [MaxLength(100)]
    public string DurumIsmi { get; set; } = null!;
}
