using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StokServis.Domain.Entities;

namespace StokServis.Infrastructure.Persistence.Configurations;

public sealed class StokHareketiConfiguration : IEntityTypeConfiguration<StokHareketi>
{
    public void Configure(EntityTypeBuilder<StokHareketi> builder)
    {
        builder.ToTable("StokHareketleri", "stok",
            t => t.HasCheckConstraint("CK_StokHareketleri_Miktar", "\"Miktar\" > 0"));

        builder.HasKey(x => x.Id);

        builder.Property(x => x.OlusturmaTarihi)
            .IsRequired();

        builder.Property(x => x.StokKalemiId)
            .IsRequired();

        builder.Property(x => x.HareketTipi)
            .IsRequired()
            .HasConversion<string>()
            .HasMaxLength(30);

        builder.Property(x => x.Miktar)
            .IsRequired();

        builder.Property(x => x.Aciklama)
            .HasMaxLength(1000);

        builder.HasIndex(x => new { x.StokKalemiId, x.OlusturmaTarihi });

        builder.HasIndex(x => x.ReferansId);
    }
}
