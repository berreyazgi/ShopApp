using KategoriServis.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KategoriServis.Infrastructure.Persistence.Configurations;

public class UrunConfiguration : IEntityTypeConfiguration<Urun>
{
    public void Configure(EntityTypeBuilder<Urun> b)
    {
        b.ToTable("Urunler", "katalog",
            t => t.HasCheckConstraint("CK_Urunler_Fiyat", "\"Fiyat\" >= 0"));

        b.HasIndex(x => x.KategoriId);

        b.HasMany(x => x.Varyantlar)
            .WithOne(x => x.Urun)
            .HasForeignKey(x => x.UrunId)
            .OnDelete(DeleteBehavior.Cascade);

        b.HasMany(x => x.Gorseller)
            .WithOne(x => x.Urun)
            .HasForeignKey(x => x.UrunId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
