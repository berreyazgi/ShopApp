using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using src.Monolith.ShopApp.Domain.Siparisler;

namespace ShopApp.Infrastructure.Persistence.Configurations;

public sealed class SiparisUrunleriConfiguration : BaseEntityConfiguration<SiparisUrunleri>
{
    public override void Configure(EntityTypeBuilder<SiparisUrunleri> builder)
    {
        base.Configure(builder);

        builder.ToTable("SiparisUrunleri", "sales");

        builder.Property(x => x.SiparisId)
            .IsRequired();

        builder.Property(x => x.UrunTurId)
            .IsRequired();

        builder.Property(x => x.UrunIsmi)
            .IsRequired()
            .HasMaxLength(500);

        builder.Property(x => x.UrunAciklamasi)
            .HasColumnType("text");

        builder.Property(x => x.StokTakipNumarasi)
            .HasMaxLength(500);

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
