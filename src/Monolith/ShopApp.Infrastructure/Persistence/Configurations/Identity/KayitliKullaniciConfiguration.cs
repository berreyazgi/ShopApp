using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ShopApp.Infrastructure.Identity.Models;

namespace ShopApp.Infrastructure.Persistence.Configurations.Identity;

public sealed class KayitliKullaniciConfiguration : IEntityTypeConfiguration<KayitliKullanici>
{
    public void Configure(EntityTypeBuilder<KayitliKullanici> builder)
    {
        builder.ToTable("Users", "identity");

        builder.Property(x => x.Ad)
            .HasColumnName("Ad")
            .IsRequired()
            .HasMaxLength(500);

        builder.Property(x => x.Soyad)
            .HasColumnName("Soyad")
            .IsRequired()
            .HasMaxLength(500);

        builder.Property(x => x.Durum)
            .HasColumnName("Durum")
            .IsRequired();

        builder.Property(x => x.OlusturmaTarihi)
            .HasColumnName("OlusturmaTarihi")
            .IsRequired();

        builder.Property(x => x.GuncellemeTarihi)
            .HasColumnName("GuncellemeTarihi")
            .IsRequired();

        builder.Property(x => x.YenilemeToken)
            .HasColumnName("YenilemeToken")
            .HasMaxLength(2000);

        builder.Property(x => x.YenilemeTokenBitis)
            .HasColumnName("YenilemeTokenBitis");
    }
}
