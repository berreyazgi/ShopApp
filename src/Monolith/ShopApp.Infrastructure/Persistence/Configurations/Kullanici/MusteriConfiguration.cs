using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ShopApp.Infrastructure.Identity.Models;
using src.Monolith.ShopApp.Domain.Kullanici;

namespace ShopApp.Infrastructure.Persistence.Configurations.Kullanici;

public class MusteriConfiguration : IEntityTypeConfiguration<Musteri>
{
    public void Configure(EntityTypeBuilder<Musteri> builder)
    {
        builder.ToTable("Musteriler", "kimlik");

        builder.Property(x => x.KullaniciId)
            .HasColumnName("KullaniciId")
            .IsRequired();

        builder.HasIndex(x => x.KullaniciId)
            .IsUnique();

        builder.HasOne<KayitliKullanici>()
            .WithOne()
            .HasForeignKey<Musteri>(x => x.KullaniciId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
