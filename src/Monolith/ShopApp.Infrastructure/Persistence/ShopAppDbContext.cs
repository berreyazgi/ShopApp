using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ShopApp.Infrastructure.Identity;
using src.Monolith.ShopApp.Domain.Kullanici;
using src.Monolith.ShopApp.Domain.Sepet;
using src.Monolith.ShopApp.Domain.Siparisler;

namespace ShopApp.Infrastructure.Persistence;

public class ShopAppDbContext : IdentityDbContext<KayitliKullanici, IdentityRole<Guid>, Guid>
{
    public ShopAppDbContext(DbContextOptions<ShopAppDbContext> options) : base(options)
    {
    }

    // User modülü
    public DbSet<Musteri> Musteriler => Set<Musteri>();
    public DbSet<AdminProfile> AdminProfilleri => Set<AdminProfile>();
    public DbSet<Address> Adresler => Set<Address>();

    // Cart modülü
    public DbSet<Sepet> Carts => Set<Sepet>();
    public DbSet<SepetUrunleri> CartItems => Set<SepetUrunleri>();
    public DbSet<SepetDurumLookup> SepetDurumlar => Set<SepetDurumLookup>();

    // Order modülü
    public DbSet<Siparis> Orders => Set<Siparis>();
    public DbSet<SiparisUrunleri> OrderItems => Set<SiparisUrunleri>();
    public DbSet<SiparisDurumLookup> SiparisDurumlar => Set<SiparisDurumLookup>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ShopAppDbContext).Assembly);
    }
    
}
