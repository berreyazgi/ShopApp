using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using UrunEntity = ShopApp.Domain.Urun.Entities.Urun;

namespace ShopApp.Infrastructure.Persistence.Configurations.Urun;

public class UrunConfiguration : IEntityTypeConfiguration<UrunEntity>
{
    public void Configure(EntityTypeBuilder<UrunEntity> b)
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