using Microsoft.AspNetCore.Identity;

namespace ShopApp.Infrastructure.Identity;

public class ApplicationUser : IdentityUser<Guid> 
{
    public string Ad { get; set; } = null!;
    public string Soyad { get; set; } = null!; 
    public string durum { get; set; } = null!;
    public string OlusturmaTarihi { get; set; } = null!;     
    public string GuncellemeTarihi { get; set; } = null!;    
    


}
