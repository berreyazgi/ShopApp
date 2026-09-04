using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StokServis.Domain.Entities;

namespace StokServis.Infrastructure.Persistence.Configurations;

public sealed class StokUrunleriConfiguration : IEntityTypeConfiguration<StokUrunleri>
{
    public void Configure(EntityTypeBuilder<StokUrunleri> builder)
    {
        builder.ToTable("StokKalemleri", "stok", t =>
        {
            t.HasCheckConstraint("CK_StokKalemleri_Miktar", "\"StokUrunMiktar\" >= 0");
            t.HasCheckConstraint("CK_StokKalemleri_RezerveMiktar",
                "\"RezerveMiktar\" >= 0 AND \"RezerveMiktar\" <= \"StokUrunMiktar\"");
        });

        builder.HasKey(x => x.Id);

        builder.Property(x => x.OlusturmaTarihi)
            .IsRequired();

        builder.Property(x => x.UrunTurId)
            .IsRequired()
            .HasColumnName("UrunTipiId");

        builder.Property(x => x.DepoId)
            .IsRequired();

        builder.Property(x => x.StokUrunMiktar)
            .IsRequired();

        builder.Property(x => x.RezerveMiktar)
            .IsRequired();

        builder.Ignore(x => x.KullanilabilirMiktar);

        builder.Property(x => x.DepoKonumu)
            .HasMaxLength(100);

        builder.HasIndex(x => new { x.UrunTurId, x.DepoId })
            .IsUnique();

        builder.HasIndex(x => x.UrunTurId);

        builder.HasMany(x => x.Hareketler)
            .WithOne(x => x.StokUrunleri)
            .HasForeignKey(x => x.StokKalemiId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
