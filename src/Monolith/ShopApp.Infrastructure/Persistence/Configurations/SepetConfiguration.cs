using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using src.Monolith.ShopApp.Domain.Sepet;

namespace ShopApp.Infrastructure.Persistence.Configurations;

public class SepetConfiguration : IEntityTypeConfiguration<Sepet>
{
    public void Configure(EntityTypeBuilder<Sepet> builder)
    {
            builder.ToTable("Sepetler", "sales");
            builder.HasKey(x => x.Id);

            builder.Property(x => x.MusteriId)
                .IsRequired();

            builder.Property(x => x.DurumId)
                .IsRequired();

            builder.HasMany(x => x.Urunleri)
                .WithOne(x => x.Sepet)
                .HasForeignKey(x => x.SepetId);

            builder.HasOne(x => x.Durum)
                .WithMany()
                .HasForeignKey(x => x.DurumId)
                .OnDelete(DeleteBehavior.Restrict);
        
    }
        
}


