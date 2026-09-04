using KargoServis.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KargoServis.Infrastructure.Persistence.Configurations;

public class KargoDurumGecmisiConfiguration : IEntityTypeConfiguration<KargoDurumGecmisi>
{
    public void Configure(EntityTypeBuilder<KargoDurumGecmisi> b)
    {
        b.Property(x => x.Durum)
            .HasConversion<string>()
            .HasMaxLength(30);

        b.HasIndex(x => new { x.KargoGonderisiId, x.OlusturmaTarihi });
    }
}
