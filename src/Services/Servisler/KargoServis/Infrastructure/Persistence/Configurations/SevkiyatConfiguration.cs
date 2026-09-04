using KargoServis.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KargoServis.Infrastructure.Persistence.Configurations;

public class SevkiyatConfiguration : IEntityTypeConfiguration<Sevkiyat>
{
    public void Configure(EntityTypeBuilder<Sevkiyat> b)
    {
        b.HasIndex(x => x.SevkiyatTanım).IsUnique();

        b.HasMany(x => x.Gonderiler)
            .WithOne(x => x.Sevkiyat)
            .HasForeignKey(x => x.SevkiyatId)
            .OnDelete(DeleteBehavior.SetNull);
    }
}
