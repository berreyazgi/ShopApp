using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ShopApp.Domain.Urun.Entities;

namespace ShopApp.Infrastructure.Persistence.Configurations.Urun;

public class UrunVaryantConfiguration : IEntityTypeConfiguration<UrunVaryant>
{
    public void Configure(EntityTypeBuilder<UrunVaryant> b)
    {
        b.ToTable("UrunVaryant", "Urunler");
        b.HasIndex(x => x.StokKod).IsUnique();

        b.Property(x => x.Beden).HasMaxLength(50);
        b.Property(x => x.Renk).HasMaxLength(100);
        b.Property(x => x.StokKod).HasMaxLength(100).IsRequired();
        b.Property(x => x.FiyatFarki).HasPrecision(18, 2);
    }
}