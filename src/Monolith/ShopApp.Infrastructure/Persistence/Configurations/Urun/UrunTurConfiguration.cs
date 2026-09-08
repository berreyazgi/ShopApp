using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ShopApp.Domain.Urun.Entities;

namespace ShopApp.Infrastructure.Persistence.Configurations.Urun;

public class UrunTurConfiguration : IEntityTypeConfiguration<UrunTur>
{
    public void Configure(EntityTypeBuilder<UrunTur> b)
    {
        b.ToTable("UrunTur", "Urunler");
        b.HasIndex(x => x.StokKod).IsUnique();

        b.Property(x => x.FiyatFarki).HasPrecision(18, 2);

        b.HasMany(x => x.Ozellikler)
            .WithOne(x => x.UrunTur)
            .HasForeignKey(x => x.UrunTurId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}