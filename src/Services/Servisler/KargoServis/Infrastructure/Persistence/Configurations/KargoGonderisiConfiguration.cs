using KargoServis.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KargoServis.Infrastructure.Persistence.Configurations;

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
