using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using src.Monolith.ShopApp.Domain.Sepet.Entities;

namespace ShopApp.Infrastructure.Persistence.Configurations;

public sealed class SepetConfiguration : BaseEntityConfiguration<SepetEntity>
{
    public override void Configure(EntityTypeBuilder<SepetEntity> builder)
    {
        base.Configure(builder);

        builder.ToTable("Sepetler", "sales");

        builder.Property(x => x.MusteriId)
            .IsRequired();

        builder.Property(x => x.DurumId)
            .IsRequired();

        builder.HasOne(x => x.Durum)
            .WithMany()
            .HasForeignKey(x => x.DurumId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasMany(x => x.Urunler)
            .WithOne(x => x.SepetEntity)
            .HasForeignKey(x => x.SepetId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
