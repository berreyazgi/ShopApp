using KategoriServis.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KategoriServis.Infrastructure.Persistence.Configurations;

public class UrunOzelligiConfiguration : IEntityTypeConfiguration<UrunOzelligi>
{
    public void Configure(EntityTypeBuilder<UrunOzelligi> b)
    {
        b.HasIndex(x => new { x.UrunTurId, x.OzellikAdi });
    }
}
