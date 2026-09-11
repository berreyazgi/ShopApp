using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ShopApp.Infrastructure.Persistence.Configurations.Common;
using src.Monolith.ShopApp.Domain.Siparis.Entities;

namespace ShopApp.Infrastructure.Persistence.Configurations.Siparis;

public sealed class SiparisUrunleriConfiguration : BaseEntityConfiguration<SiparisUrunleri>
{
    public override void Configure(EntityTypeBuilder<SiparisUrunleri> builder)
    {
        base.Configure(builder);

        builder.ToTable("SiparisUrunleri", "Satis");

        builder.Property(x => x.SiparisId)
            .IsRequired();

        builder.Property(x => x.UrunVaryantId)
            .IsRequired();

        builder.Property(x => x.UrunIsmi)
            .IsRequired()
            .HasMaxLength(500);

        builder.Property(x => x.UrunAciklamasi)
            .HasColumnType("text");

        builder.Property(x => x.StokTakipNumarasi)
            .HasMaxLength(500);

        builder.Property(x => x.Beden)
            .HasMaxLength(50);

        builder.Property(x => x.Renk)
            .HasMaxLength(100);

        builder.Property(x => x.UrunMiktar)
            .IsRequired();

        builder.Property(x => x.UrunBirimFiyat)
            .IsRequired()
            .HasPrecision(18, 2);

        builder.Property(x => x.IndirimOrani)
            .IsRequired()
            .HasPrecision(18, 4);

        builder.Property(x => x.ToplamFiyat)
            .IsRequired()
            .HasPrecision(18, 2);
    }
}
