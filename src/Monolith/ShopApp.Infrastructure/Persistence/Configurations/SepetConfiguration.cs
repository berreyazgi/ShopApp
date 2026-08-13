using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using src.Monolith.ShopApp.Domain.Sepet;

namespace ShopApp.Infrastructure.Persistence.Configurations;

public class SepetConfiguration : IEntityTypeConfiguration<Sepet>
{
    public void Configure(EntityTypeBuilder<Sepet> builder)
    {
        builder.HasMany(x => x.Urunler)
            .WithOne(x => x.Sepet)
            .HasForeignKey(x => x.SepetId);

        builder.HasOne(x => x.Durum)
            .WithMany()
            .HasForeignKey(x => x.DurumId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
