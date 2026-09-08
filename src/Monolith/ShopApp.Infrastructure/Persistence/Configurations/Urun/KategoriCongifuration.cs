using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.IdentityModel.Tokens;
using ShopApp.Domain.Urun.Entities;


namespace ShopApp.Infrastructure.Persistence.Configurations.Urun;

public class KategoriCongifuration : IEntityTypeConfiguration<Kategori>
{
    public void Configure(EntityTypeBuilder<Kategori> builder)
    {
        builder.ToTable("Kategori", "Urunler");
        
        builder.HasOne(x => x.UstKategori)
            .WithMany(x => x.AltKategoriler)
            .HasForeignKey(x => x.UstKategoriId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasMany(x => x.Urunler)
            .WithOne(x => x.Kategori)
            .HasForeignKey(x => x.KategoriId)
            .OnDelete(DeleteBehavior.Restrict);
      
    }
}