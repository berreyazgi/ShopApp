using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ShopApp.Application.Abstractions;
using ShopApp.Infrastructure.Identity;
using src.Monolith.ShopApp.Domain.Kullanici;
using src.Monolith.ShopApp.Domain.Sepet;
using src.Monolith.ShopApp.Domain.Sepet.Entities;
using SepetUrunuEntity = src.Monolith.ShopApp.Domain.Sepet.Entities.SepetUrunu;
using src.Monolith.ShopApp.Domain.Siparisler;

namespace ShopApp.Infrastructure.Persistence;

public class ShopAppDbContext : IdentityDbContext<KayitliKullanici, IdentityRole<Guid>, Guid>, IShopAppDbContext
{

    public ShopAppDbContext(DbContextOptions<ShopAppDbContext> options) : base(options)
    {
    }

    // User modülü
    public DbSet<Musteri> Musteriler => Set<Musteri>();
    public DbSet<AdminProfile> AdminProfilleri => Set<AdminProfile>();
    public DbSet<Address> Adresler => Set<Address>();

    // Cart modülü
    public DbSet<SepetEntity> Carts => Set<SepetEntity>();
    public DbSet<SepetUrunuEntity> CartItems => Set<SepetUrunuEntity>();
    public DbSet<SepetDurumLookup> SepetDurumlar => Set<SepetDurumLookup>();

    // Order modülü
    public DbSet<SiparisEntity> Orders => Set<SiparisEntity>();
    public DbSet<SiparisEntity> Siparisler => Set<SiparisEntity>();
    public DbSet<SepetEntity> Sepetler => Set<SepetEntity>();

    public DbSet<SepetUrunuEntity> SepetUrunleri => Set<SepetUrunuEntity>();

    public DbSet<SiparisUrunleri> SiparisUrunleri => Set<SiparisUrunleri>();

    public DbSet<SiparisUrunleri> OrderItems => Set<SiparisUrunleri>();
    public DbSet<SiparisDurumLookup> SiparisDurumlar => Set<SiparisDurumLookup>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ShopAppDbContext).Assembly);
    }
    
}
