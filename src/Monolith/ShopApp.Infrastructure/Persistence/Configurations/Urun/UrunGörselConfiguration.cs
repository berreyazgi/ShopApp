using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ShopApp.Domain.Urun.Entities;

namespace ShopApp.Infrastructure.Persistence.Configurations.Urun;

public class UrunGörselConfiguration : IEntityTypeConfiguration<UrunGorsel>
{
    public void Configure(EntityTypeBuilder<UrunGorsel> b)
    {
        b.HasIndex(x => new { x.UrunId, x.GorselSira });
    }
}