using KategoriServis.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KategoriServis.Infrastructure.Persistence;

public class KategoriDbContext(DbContextOptions<KategoriDbContext> options) : DbContext(options)
{
    public DbSet<Kategori> Kategoriler => Set<Kategori>();
    public DbSet<Urun> Urunler => Set<Urun>();
    public DbSet<UrunTur> UrunTurleri => Set<UrunTur>();
    public DbSet<UrunOzelligi> UrunOzellikleri => Set<UrunOzelligi>();
    public DbSet<UrunGorseli> UrunGorselleri => Set<UrunGorseli>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(KategoriDbContext).Assembly);
    }
}

public class KategoriConfiguration : IEntityTypeConfiguration<Kategori>
{
    public void Configure(EntityTypeBuilder<Kategori> b)
    {

        b.HasOne(x => x.UstKategori)
            .WithMany(x => x.AltKategoriler)
            .HasForeignKey(x => x.UstKategoriId)
            .OnDelete(DeleteBehavior.Restrict);

        b.HasMany(x => x.Urunler)
            .WithOne(x => x.Kategori)
            .HasForeignKey(x => x.KategoriId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}

public class UrunConfiguration : IEntityTypeConfiguration<Urun>
{
    public void Configure(EntityTypeBuilder<Urun> b)
    {

        b.ToTable("Urunler", "katalog",
            t => t.HasCheckConstraint("CK_Urunler_Fiyat", "\"Fiyat\" >= 0"));

        b.HasIndex(x => x.KategoriId);

        b.HasMany(x => x.UrunTurleri)
            .WithOne(x => x.Urun)
            .HasForeignKey(x => x.UrunId)
            .OnDelete(DeleteBehavior.Cascade);

        b.HasMany(x => x.Gorseller)
            .WithOne(x => x.Urun)
            .HasForeignKey(x => x.UrunId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}

public class UrunTurConfiguration : IEntityTypeConfiguration<UrunTur>
{
    public void Configure(EntityTypeBuilder<UrunTur> b)
    {
        b.HasIndex(x => x.StokKodu).IsUnique();

        b.Property(x => x.FiyatFarki).HasPrecision(18, 2);

        b.HasMany(x => x.Ozellikler)
            .WithOne(x => x.UrunTur)
            .HasForeignKey(x => x.UrunTurId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}

public class UrunOzelligiConfiguration : IEntityTypeConfiguration<UrunOzelligi>
{
    public void Configure(EntityTypeBuilder<UrunOzelligi> b)
    {
        b.HasIndex(x => new { x.UrunTurId, x.OzellikAdi });
    }
}

public class UrunGorseliConfiguration : IEntityTypeConfiguration<UrunGorseli>
{
    public void Configure(EntityTypeBuilder<UrunGorseli> b)
    {
        b.HasIndex(x => new { x.UrunId, x.GorselSiralamasi });
    }
}
