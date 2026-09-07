using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ShopApp.Domain.Urun.Entities;

namespace ShopApp.Infrastructure.Persistence.Configurations.Urun;

public class UrunOzellikConfiguration : IEntityTypeConfiguration<UrunOzellik>
{
    public void Configure(EntityTypeBuilder<UrunOzellik> b)
    {
        b.HasIndex(x => new { x.UrunTurId, x.OzellikAd });
    }
}