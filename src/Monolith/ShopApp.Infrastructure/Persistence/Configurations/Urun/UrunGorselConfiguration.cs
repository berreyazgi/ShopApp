using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ShopApp.Domain.Urun.Entities;

namespace ShopApp.Infrastructure.Persistence.Configurations.Urun;

public class UrunGorselConfiguration : IEntityTypeConfiguration<UrunGorsel>
{
    public void Configure(EntityTypeBuilder<UrunGorsel> b)
    {
        b.ToTable("UrunGorsel", "Urunler");
        b.HasIndex(x => new { x.UrunId, x.GorselSira });
    }
}