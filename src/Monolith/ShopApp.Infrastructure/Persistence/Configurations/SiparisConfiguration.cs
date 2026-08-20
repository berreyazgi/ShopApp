using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using src.Monolith.ShopApp.Domain.Siparisler;

namespace ShopApp.Infrastructure.Persistence.Configurations;

public class SiparisConfiguration : IEntityTypeConfiguration<Siparis>
{
    public void Configure(EntityTypeBuilder<Siparis> builder)
    {
        builder.HasMany(x => x.Urunler)
            .WithOne(x => x.Siparis)
            .HasForeignKey(x => x.SiparisId);

        builder.HasOne(x => x.Durum)
            .WithMany()
            .HasForeignKey(x => x.DurumId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
