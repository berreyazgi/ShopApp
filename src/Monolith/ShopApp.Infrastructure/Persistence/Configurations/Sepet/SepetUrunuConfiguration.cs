using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ShopApp.Infrastructure.Persistence.Configurations.Common;
using src.Monolith.ShopApp.Domain.Sepet.Entities;

namespace ShopApp.Infrastructure.Persistence.Configurations.Sepet;

public sealed class SepetUrunuConfiguration : BaseEntityConfiguration<SepetUrunu>
{
    public override void Configure(EntityTypeBuilder<SepetUrunu> builder)
    {
        base.Configure(builder);

        builder.ToTable("SepetUrunleri", "Satis");

        builder.Property(x => x.SepetId)
            .IsRequired();

        builder.Property(x => x.UrunTurId)
            .IsRequired();

        builder.Property(x => x.UrunMiktar)
            .IsRequired();

        builder.Property(x => x.FiyatGecmis)
            .IsRequired()
            .HasPrecision(18, 2);
    }
}
