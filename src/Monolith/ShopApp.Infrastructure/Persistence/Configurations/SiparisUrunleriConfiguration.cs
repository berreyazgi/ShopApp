using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using src.Monolith.ShopApp.Domain.Siparisler;

namespace ShopApp.Infrastructure.Persistence.Configurations;

public class SiparisUrunleriConfiguration : IEntityTypeConfiguration<SiparisUrunleri>
{
    public void Configure(EntityTypeBuilder<SiparisUrunleri> builder)
    {
        builder.ToTable("SiparisUrunleri", "sales");

        builder.Property(x => x.SiparisId)
            .IsRequired();

        builder.Property(x => x.UrunCesidId)
            .IsRequired();

        builder.Property(x => x.UrunIsmi)
            .IsRequired()
            .HasMaxLength(500);

        builder.Property(x => x.Sku)
            .IsRequired()
            .HasMaxLength(500);

        builder.Property(x => x.Miktar)
            .IsRequired();

        builder.Property(x => x.BirimFiyat)
            .IsRequired();

        builder.Property(x => x.IndirimOrani)
            .IsRequired();
    }
 
    
}