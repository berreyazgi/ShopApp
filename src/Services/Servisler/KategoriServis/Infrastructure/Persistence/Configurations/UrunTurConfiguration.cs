using KategoriServis.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KategoriServis.Infrastructure.Persistence.Configurations;

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
