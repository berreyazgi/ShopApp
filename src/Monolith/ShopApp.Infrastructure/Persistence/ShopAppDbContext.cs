using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ShopApp.Infrastructure.Identity;
using src.Monolith.ShopApp.Domain.Kullanici;
using src.Monolith.ShopApp.Domain.Sepet;
using src.Monolith.ShopApp.Domain.Siparisler;

namespace ShopApp.Infrastructure.Persistence;

public class ShopAppDbContext : IdentityDbContext<ApplicationUser, IdentityRole<Guid>, Guid>
{
    public ShopAppDbContext(DbContextOptions<ShopAppDbContext> options) : base(options)
    {
    }

    // User modülü
    public DbSet<Musteri> Musteriler => Set<Musteri>();
    public DbSet<Address> Addresses => Set<Address>();

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
        // 1. Identity varsayılan şemalarını yükle
        base.OnModelCreating(modelBuilder);

        // 2. Infrastructure assembly'sindeki IEntityTypeConfiguration sınıflarını tara ve uygula
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ShopAppDbContext).Assembly);

        // 3. Identity tablolarının isim ve şema yapılandırmalarını uygula
        ConfigureIdentityTables(modelBuilder);
    }

    private static void ConfigureIdentityTables(ModelBuilder modelBuilder)
    {
        // Primary key olarak Guid kullandığın için generic parametreler <Guid> ile güncellendi
        modelBuilder.Entity<ApplicationUser>()
            .ToTable("Users", "identity");

        modelBuilder.Entity<IdentityRole<Guid>>()
            .ToTable("Roles", "identity");

        modelBuilder.Entity<IdentityUserRole<Guid>>()
            .ToTable("UserRoles", "identity");

        modelBuilder.Entity<IdentityUserClaim<Guid>>()
            .ToTable("UserClaims", "identity");

        modelBuilder.Entity<IdentityUserLogin<Guid>>()
            .ToTable("UserLogins", "identity");

        modelBuilder.Entity<IdentityRoleClaim<Guid>>()
            .ToTable("RoleClaims", "identity");

        modelBuilder.Entity<IdentityUserToken<Guid>>()
            .ToTable("UserTokens", "identity");
    }
}
