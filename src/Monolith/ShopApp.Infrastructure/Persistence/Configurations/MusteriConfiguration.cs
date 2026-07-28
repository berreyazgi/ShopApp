using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using src.Monolith.ShopApp.Domain.Kullanici;

namespace ShopApp.Infrastructure.Persistence.Configurations;

public class MusteriConfiguration : IEntityTypeConfiguration<Musteri>
{
    public void Configure(
        EntityTypeBuilder<Musteri> builder)
    {
        builder.ToTable("Musteriler", "identity");

        builder.Property(x => x.Cinsiyet)
            .IsRequired()
            .HasMaxLength(500);

        builder.Property(x => x.DogumTarihi)
            .IsRequired()
            .HasMaxLength(500);

        builder.Property(x => x.Email)
            .IsRequired()
            .HasMaxLength(500);
    }

}