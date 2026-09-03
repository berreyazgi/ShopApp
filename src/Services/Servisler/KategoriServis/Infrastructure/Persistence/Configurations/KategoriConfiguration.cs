using KategoriServis.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KategoriServis.Infrastructure.Persistence.Configurations;

public class KategoriConfiguration : IEntityTypeConfiguration<Kategori>
{
    public void Configure(EntityTypeBuilder<Kategori> b)
    {
        b.HasOne(x => x.UstKategori)
            .WithMany(x => x.AltKategoriler)
            .HasForeignKey(x => x.UstKategoriId)
            .OnDelete(DeleteBehavior.Restrict);

        b.HasMany(x => x.Urunler)
            .WithOne(x => x.Kategori)
            .HasForeignKey(x => x.KategoriId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
