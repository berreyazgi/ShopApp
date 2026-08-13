using StokServis.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

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

public class DepoConfiguration : IEntityTypeConfiguration<Depo>
{
    public void Configure(EntityTypeBuilder<Depo> b)
    {
        b.HasIndex(x => x.DepoIsmi).IsUnique();

        b.HasMany(x => x.StokKalemleri)
            .WithOne(x => x.Depo)
            .HasForeignKey(x => x.DepoId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}

public class StokUrunleriConfiguration : IEntityTypeConfiguration<StokUrunleri>
{
    public void Configure(EntityTypeBuilder<StokUrunleri> b)
    {
        b.ToTable("StokKalemleri", "stok", t =>
        {
            t.HasCheckConstraint("CK_StokKalemleri_Miktar", "\"Miktar\" >= 0");
            t.HasCheckConstraint("CK_StokKalemleri_RezerveMiktar",
                "\"RezerveMiktar\" >= 0 AND \"RezerveMiktar\" <= \"Miktar\"");
        });

        b.HasIndex(x => new { x.UrunTipiId, x.DepoId }).IsUnique();

        b.HasIndex(x => x.UrunTipiId);

        b.HasMany(x => x.Hareketler)
            .WithOne(x => x.StokUrunleri)
            .HasForeignKey(x => x.StokKalemiId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}

public class StokHareketiConfiguration : IEntityTypeConfiguration<StokHareketi>
{
    public void Configure(EntityTypeBuilder<StokHareketi> b)
    {
        b.ToTable("StokHareketleri", "stok",
            t => t.HasCheckConstraint("CK_StokHareketleri_Miktar", "\"Miktar\" > 0"));

        b.Property(x => x.HareketTipi)
            .HasConversion<string>()
            .HasMaxLength(30);

        b.HasIndex(x => new { x.StokKalemiId, x.OlusturmaTarihi });

        b.HasIndex(x => x.ReferansId);
    }
}
