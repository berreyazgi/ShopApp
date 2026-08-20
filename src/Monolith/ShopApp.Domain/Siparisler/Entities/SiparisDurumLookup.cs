using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace src.Monolith.ShopApp.Domain.Siparisler;

[Table("SiparisDurum", Schema = "sales")]
public class SiparisDurumLookup
{
    /// <summary>Enum integer değeri (primary key).</summary>
    [Key]
    public int Id { get; set; }

    /// <summary>Okunabilir durum adı (örn. "Bekleyen Ödeme", "Teslim Edildi").</summary>
    [Required]
    [MaxLength(100)]
    public string DurumIsmi { get; set; } = null!;
}
