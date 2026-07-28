using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ShopApp.Infrastructure.Identity;
using src.Monolith.ShopApp.Domain.Kullanici;
using src.Monolith.ShopApp.Domain.Sepet;
using src.Monolith.ShopApp.Domain.Siparisler;

namespace ShopApp.Infrastructure.Persistence;
public class ShopAppDbContext : IdentityDbContext<ApplicationUser>
{

    public ShopAppDbContext(DbContextOptions<ShopAppDbContext> options)
        : base(options)
    {

    }
    // User modülü
    public DbSet<Musteri> Customers => Set<Musteri>();
    public DbSet<Address> Addresses => Set<Address>();

    // Cart modülü
    public DbSet<Sepet> Carts => Set<Sepet>();
    public DbSet<SepetUrunleri> CartItems => Set<SepetUrunleri>();

    // Order modülü
    public DbSet<Siparis> Orders => Set<Siparis>();
    public DbSet<SiparisUrunleri> OrderItems => Set<SiparisUrunleri>();

    protected override void OnModelCreating(
        ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfigurationsFromAssembly(
            typeof(ShopAppDbContext).Assembly);

        ConfigureIdentityTables(modelBuilder);
    }

    private static void ConfigureIdentityTables(
        ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<IdentityRole>()
            .ToTable("Roles", "identity");

        modelBuilder.Entity<IdentityUserRole<string>>()
            .ToTable("UserRoles", "identity");

        modelBuilder.Entity<IdentityUserClaim<string>>()
            .ToTable("UserClaims", "identity");

        modelBuilder.Entity<IdentityUserLogin<string>>()
            .ToTable("UserLogins", "identity");

        modelBuilder.Entity<IdentityRoleClaim<string>>()
            .ToTable("RoleClaims", "identity");

        modelBuilder.Entity<IdentityUserToken<string>>()
            .ToTable("UserTokens", "identity");
    }

}
        
        