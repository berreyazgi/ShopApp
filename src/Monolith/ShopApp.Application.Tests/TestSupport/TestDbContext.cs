using Microsoft.EntityFrameworkCore;
using ShopApp.Application.Common.Interfaces;
using src.Monolith.ShopApp.Domain.Sepet.Entities;
using src.Monolith.ShopApp.Domain.Siparis.Entities;

namespace ShopApp.Application.Tests.TestSupport;

public sealed class TestDbContext(DbContextOptions<TestDbContext> options) : DbContext(options), IShopAppDbContext
{
    public DbSet<SiparisEntity> Siparisler => Set<SiparisEntity>();
    public DbSet<SepetEntity> Sepetler => Set<SepetEntity>();
    public DbSet<SepetUrunu> SepetUrunleri => Set<SepetUrunu>();
    public DbSet<src.Monolith.ShopApp.Domain.Siparis.Entities.SiparisUrunleri> SiparisUrunleri => Set<src.Monolith.ShopApp.Domain.Siparis.Entities.SiparisUrunleri>();
    public DbSet<SiparisDurumLookup> SiparisDurumlar => Set<SiparisDurumLookup>();
    public DbSet<src.Monolith.ShopApp.Domain.Kullanici.Address> Adresler => Set<src.Monolith.ShopApp.Domain.Kullanici.Address>();
    public DbSet<src.Monolith.ShopApp.Domain.Kullanici.Musteri> Musteriler => Set<src.Monolith.ShopApp.Domain.Kullanici.Musteri>();

    public static TestDbContext Create()
    {
        var options = new DbContextOptionsBuilder<TestDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;
        return new TestDbContext(options);
    }
}
