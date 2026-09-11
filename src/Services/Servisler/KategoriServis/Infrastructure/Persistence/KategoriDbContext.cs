using KategoriServis.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace KategoriServis.Infrastructure.Persistence;

public class KategoriDbContext(DbContextOptions<KategoriDbContext> options) : DbContext(options)
{
    public DbSet<Kategori> Kategoriler => Set<Kategori>();
    public DbSet<Urun> Urunler => Set<Urun>();
    public DbSet<UrunVaryant> Varyantlar => Set<UrunVaryant>();
    public DbSet<UrunOzelligi> UrunOzellikleri => Set<UrunOzelligi>();
    public DbSet<UrunGorseli> UrunGorselleri => Set<UrunGorseli>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(KategoriDbContext).Assembly);
    }
}
