using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using src.Monolith.ShopApp.Domain.Siparisler;

namespace ShopApp.Infrastructure.Persistence.Configurations;

public sealed class SiparisConfiguration : BaseEntityConfiguration<SiparisEntity>
{
    public override void Configure(EntityTypeBuilder<SiparisEntity> builder)
    {
        base.Configure(builder);

        builder.ToTable("Siparisler", "sales");

        builder.Property(x => x.MusteriId)
            .IsRequired();

        builder.Property(x => x.SiparisNumarasi)
            .IsRequired()
            .HasMaxLength(50);

        builder.Property(x => x.AraToplam)
            .IsRequired()
            .HasPrecision(18, 2);

        builder.Property(x => x.IndirimTutari)
            .IsRequired()
            .HasPrecision(18, 2);

        builder.Property(x => x.KargoFiyat)
            .IsRequired()
            .HasPrecision(18, 2);

        builder.Property(x => x.ToplamFiyat)
            .IsRequired()
            .HasPrecision(18, 2);

        builder.HasOne(x => x.Durum)
            .WithMany()
            .HasForeignKey(x => x.DurumId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasMany(x => x.Urunler)
            .WithOne(x => x.SiparisEntity)
            .HasForeignKey(x => x.SiparisId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
