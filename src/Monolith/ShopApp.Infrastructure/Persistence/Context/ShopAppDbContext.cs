using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Domain.Urun.Entities;
using ShopApp.Infrastructure.Identity.Models;
using src.Monolith.ShopApp.Domain.Kullanici;
using src.Monolith.ShopApp.Domain.Sepet.Enums;
using src.Monolith.ShopApp.Domain.Sepet.Entities;
using SepetUrunuEntity = src.Monolith.ShopApp.Domain.Sepet.Entities.SepetUrunu;
using src.Monolith.ShopApp.Domain.Siparis.Entities;

namespace ShopApp.Infrastructure.Persistence.Context;

public class ShopAppDbContext : IdentityDbContext<KayitliKullanici, IdentityRole<Guid>, Guid>, IShopAppDbContext
{

    public ShopAppDbContext(DbContextOptions<ShopAppDbContext> options) : base(options)
    {
    }

    // User modülü
    public DbSet<Musteri> Musteriler => Set<Musteri>();
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
    
    //Product modülü
    public DbSet<Urun> Urun => Set<Urun>();
    public DbSet<Kategori> Kategori => Set<Kategori>();
    public DbSet<UrunGorsel> UrunGorsel => Set<UrunGorsel>();
    public DbSet<UrunTur> UrunTur => Set<UrunTur>();
    public DbSet<UrunOzellik> UrunOzellik => Set<UrunOzellik>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ShopAppDbContext).Assembly);
    }
    
}
