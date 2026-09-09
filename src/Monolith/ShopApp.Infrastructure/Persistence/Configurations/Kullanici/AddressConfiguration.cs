using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using src.Monolith.ShopApp.Domain.Kullanici;

namespace ShopApp.Infrastructure.Persistence.Configurations.Kullanici;

public class AddressConfiguration : IEntityTypeConfiguration<Address>
{
    public void Configure(EntityTypeBuilder<Address> builder)
    {
        builder.ToTable("Adresler", "kimlik");

        builder.Property(x => x.AdresBilgisi)
            .HasColumnName("AdresBilgisi")
            .HasMaxLength(5000);

        builder.Property(x => x.PostaKodu)
            .HasColumnName("PostaKodu")
            .HasColumnType("integer")
            .IsRequired();

        builder.Property(x => x.Mahalle)
            .HasColumnName("Mahalle")
            .HasColumnType("integer")
            .IsRequired();

        builder.HasOne(x => x.Musteri)
            .WithMany()
            .HasForeignKey(x => x.MusteriId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}