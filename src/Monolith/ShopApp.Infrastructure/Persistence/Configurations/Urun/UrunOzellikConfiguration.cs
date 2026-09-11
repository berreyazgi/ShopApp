using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ShopApp.Domain.Urun.Entities;

namespace ShopApp.Infrastructure.Persistence.Configurations.Urun;

public class UrunOzellikConfiguration : IEntityTypeConfiguration<UrunOzellik>
{
    public void Configure(EntityTypeBuilder<UrunOzellik> b)
    {
        b.ToTable("UrunOzellik", "Urunler");
        b.Property(x => x.OzellikAd).HasMaxLength(200).IsRequired();
        b.Property(x => x.Deger).HasMaxLength(500).IsRequired();
        b.Property(x => x.Siralama).IsRequired();
        b.HasIndex(x => new { x.UrunId, x.OzellikAd });
    }
}