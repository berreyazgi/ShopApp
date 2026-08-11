using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace ShopApp.Infrastructure.Identity;

public class ApplicationUser : IdentityUser<Guid> 
{
    public string Ad { get; set; } = null!;
    public string Soyad { get; set; } = null!;
    public string Durum { get; set; } = null!;
    
    public DateTime OlusturmaTarihi { get; set; } = DateTime.UtcNow; 
    public DateTime GuncellemeTarihi { get; set; } = DateTime.UtcNow;



}
