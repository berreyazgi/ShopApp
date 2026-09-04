using StokServis.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace StokServis.Infrastructure.Persistence;

public class StokDbContext(DbContextOptions<StokDbContext> options) : DbContext(options)
{
    public DbSet<StokUrunleri> StokKalemleri => Set<StokUrunleri>();
    public DbSet<Depo> Depolar => Set<Depo>();
    public DbSet<StokHareketi> StokHareketleri => Set<StokHareketi>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(StokDbContext).Assembly);
    }
}

