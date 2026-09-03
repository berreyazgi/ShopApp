using Microsoft.EntityFrameworkCore;
using ShopApp.Application.Abstractions;
using src.Monolith.ShopApp.Domain.Sepet.Entities;
using src.Monolith.ShopApp.Domain.Siparisler;

namespace ShopApp.Application.Tests.TestSupport;

public sealed class TestDbContext(DbContextOptions<TestDbContext> options) : DbContext(options), IShopAppDbContext
{
    public DbSet<SiparisEntity> Siparisler => Set<SiparisEntity>();
    public DbSet<SepetEntity> Sepetler => Set<SepetEntity>();
    public DbSet<SepetUrunu> SepetUrunleri => Set<SepetUrunu>();
    public DbSet<SiparisUrunleri> SiparisUrunleri => Set<SiparisUrunleri>();
    public DbSet<SiparisDurumLookup> SiparisDurumlar => Set<SiparisDurumLookup>();

    public static TestDbContext Create()
    {
        var options = new DbContextOptionsBuilder<TestDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;
        return new TestDbContext(options);
    }
}
