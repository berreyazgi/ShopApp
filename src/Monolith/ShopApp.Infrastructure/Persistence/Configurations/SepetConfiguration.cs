using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using src.Monolith.ShopApp.Domain.Sepet;

namespace ShopApp.Infrastructure.Persistence.Configurations;

public class SepetConfiguration : IEntityTypeConfiguration<Sepet>
{
    public void Configure(EntityTypeBuilder<Sepet> builder)
    {
            builder.ToTable("Sepetler", "sales");

            builder.Property(x => x.MusteriId)
                .IsRequired();

            builder.Property(x => x.Durum)
                .IsRequired();

            builder.HasMany(x => x.Urunleri)
                .WithOne(x => x.Sepet)
                .HasForeignKey(x => x.SepetId);
        }
        
}

