using KargoServis.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

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

public class TasiyiciConfiguration : IEntityTypeConfiguration<Sevkiyat>
{
    public void Configure(EntityTypeBuilder<Sevkiyat> b)
    {
        b.HasIndex(x => x.SevkiyatTanım).IsUnique();

        b.HasMany(x => x.Gonderiler)
            .WithOne(x => x.Sevkiyat)
            .HasForeignKey(x => x.SevkiyatId)
            .OnDelete(DeleteBehavior.SetNull);
    }
}

public class KargoGonderisiConfiguration : IEntityTypeConfiguration<KargoGonderisi>
{
    public void Configure(EntityTypeBuilder<KargoGonderisi> b)
    {
        b.Property(x => x.Durum)
            .HasConversion<string>()
            .HasMaxLength(30);

        b.Property(x => x.TeslimatAdresiAnlikGoruntusu)
            .HasColumnType("jsonb");

        b.HasIndex(x => x.TakipNumarasi)
            .IsUnique()
            .HasFilter("\"TakipNumarasi\" IS NOT NULL");

        b.HasIndex(x => x.SiparisId);

        b.HasMany(x => x.DurumGecmisi)
            .WithOne(x => x.KargoGonderisi)
            .HasForeignKey(x => x.KargoGonderisiId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}

public class KargoDurumGecmisiConfiguration : IEntityTypeConfiguration<KargoDurumGecmisi>
{
    public void Configure(EntityTypeBuilder<KargoDurumGecmisi> b)
    {
        b.Property(x => x.Durum)
            .HasConversion<string>()
            .HasMaxLength(30);

        b.HasIndex(x => new { x.KargoGonderisiId, x.OlusturmaTarihi });
    }
}
