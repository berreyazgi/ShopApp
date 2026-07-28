using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using src.Monolith.ShopApp.Domain.Kullanici;

namespace ShopApp.Infrastructure.Persistence.Configurations;

public class AddressConfiguration : IEntityTypeConfiguration<Address>
{
 public void Configure(EntityTypeBuilder<Address> builder)
    {
        builder.ToTable("Addresses", "identity");

        builder.Property(x => x.AddressBilgisi)
            .IsRequired()
            .HasMaxLength(500);

        builder.Property(x => x.Ulke)
            .IsRequired()
            .HasMaxLength(500);

        builder.Property(x => x.Sehir)
            .IsRequired()
            .HasMaxLength(500);

        builder.Property(x => x.PostaKodu)
            .IsRequired()
            .HasMaxLength(5) 
            .IsFixedLength();
        
        builder.Property(x => x.Ilce)
            .IsRequired()
            .HasMaxLength(500);
            
        builder.Property(x => x.TamAdres)
            .IsRequired()
            .HasMaxLength(500);
    } 

}