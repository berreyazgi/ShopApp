using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StokServis.Domain.Entities;

namespace StokServis.Infrastructure.Persistence.Configurations;

public sealed class DepoConfiguration : IEntityTypeConfiguration<Depo>
{
    public void Configure(EntityTypeBuilder<Depo> builder)
    {
        builder.ToTable("Depolar", "stok");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.OlusturmaTarihi)
            .IsRequired();

        builder.Property(x => x.DepoIsmi)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(x => x.DepoAdresi)
            .IsRequired()
            .HasMaxLength(500);

        builder.Property(x => x.Sehir)
            .IsRequired();

        builder.Property(x => x.AktifMi)
            .IsRequired()
            .HasDefaultValue(true);

        builder.HasIndex(x => x.DepoIsmi)
            .IsUnique();

        builder.HasMany(x => x.StokKalemleri)
            .WithOne(x => x.Depo)
            .HasForeignKey(x => x.DepoId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
