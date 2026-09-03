using KategoriServis.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KategoriServis.Infrastructure.Persistence.Configurations;

public class UrunGorseliConfiguration : IEntityTypeConfiguration<UrunGorseli>
{
    public void Configure(EntityTypeBuilder<UrunGorseli> b)
    {
        b.HasIndex(x => new { x.UrunId, x.GorselSiralamasi });
    }
}
