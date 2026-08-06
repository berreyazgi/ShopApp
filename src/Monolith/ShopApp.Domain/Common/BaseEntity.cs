namespace src.Monolith.ShopApp.Domain.Common;
public class BaseEntity
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public DateTime OlusturmaTarihi { get; set; } = DateTime.UtcNow;
    public DateTime? GuncellemeTarihi { get; set; }
    public Guid? OlusturanKullaniciId { get; set;}
    protected void MarkAsUpdated()
    {
        GuncellemeTarihi = DateTime.UtcNow;
        
    }

}