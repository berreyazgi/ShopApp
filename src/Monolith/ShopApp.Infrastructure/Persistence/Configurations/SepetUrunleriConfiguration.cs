using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using src.Monolith.ShopApp.Domain.Sepet;

namespace ShopApp.Infrastructure.Persistence.Configurations;

public class SepetUrunleriConfiguration : IEntityTypeConfiguration<SepetUrunleri>
{
    public void Configure(EntityTypeBuilder<SepetUrunleri> builder)
    {
        builder.ToTable("SepetUrunleri", "sales");

        builder.Property(x => x.SepetId)
            .IsRequired();

        builder.Property(x => x.UrunCesidId)
            .IsRequired();

        builder.Property(x => x.UrunMiktar)
            .IsRequired();

        builder.Property(x => x.UrunAdet)
            .IsRequired();

        builder.Property(x => x.BirimFiyatSnapshot)
            .IsRequired();
    }
}