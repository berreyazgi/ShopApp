using KargoServis.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace KargoServis.Infrastructure.Persistence;

public class KargoDbContext(DbContextOptions<KargoDbContext> options) : DbContext(options)
{
    public DbSet<Sevkiyat> Sevkiyatlar => Set<Sevkiyat>();
    public DbSet<KargoGonderisi> KargoGonderileri => Set<KargoGonderisi>();
    public DbSet<KargoDurumGecmisi> KargoDurumGecmisleri => Set<KargoDurumGecmisi>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(KargoDbContext).Assembly);
    }
}
