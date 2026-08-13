using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace ShopApp.Infrastructure.Identity;

public class KayitliKullanici : IdentityUser<Guid>
{
    [Required]
    [MaxLength(500)]
    public string Ad { get; set; } = null!;

    [Required]
    [MaxLength(500)]
    public string Soyad { get; set; } = null!;

    [Required]
    public string Durum { get; set; } = null!;

    public DateTime OlusturmaTarihi { get; set; } = DateTime.UtcNow;
    public DateTime GuncellemeTarihi { get; set; } = DateTime.UtcNow;

    // JWT yenileme token alanları
    public string? YenilemeToken { get; set; }
    public DateTime? YenilemeTokenBitis { get; set; }
}
