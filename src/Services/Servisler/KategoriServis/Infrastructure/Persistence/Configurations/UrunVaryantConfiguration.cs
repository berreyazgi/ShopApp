using KategoriServis.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KategoriServis.Infrastructure.Persistence.Configurations;

public class UrunVaryantConfiguration : IEntityTypeConfiguration<UrunVaryant>
{
    public void Configure(EntityTypeBuilder<UrunVaryant> b)
    {
        b.HasIndex(x => x.StokKodu).IsUnique();

        b.Property(x => x.FiyatFarki).HasPrecision(18, 2);

        b.HasMany(x => x.Ozellikler)
            .WithOne(x => x.UrunVaryant)
            .HasForeignKey(x => x.UrunVaryantId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
