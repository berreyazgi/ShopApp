using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using src.Monolith.ShopApp.Domain.Siparisler;

namespace ShopApp.Infrastructure.Persistence.Configurations;

public class SiparisConfiguration : IEntityTypeConfiguration<Siparis>
{
    public void Configure(EntityTypeBuilder<Siparis> builder)
    {
        builder.ToTable("Siparisler", "sales");

        builder.Property(x => x.MusteriId)
            .IsRequired();

        builder.Property(x => x.SiparisNumarasi)
            .IsRequired();

        builder.Property(x => x.Status)
            .IsRequired();

        builder.Property(x => x.AraToplam)
            .IsRequired();

        builder.Property(x => x.IndirimOrani)
            .IsRequired();

        builder.Property(x => x.KargoFiyat)
            .IsRequired();

        builder.Property(x => x.ToplamFiyat)
            .IsRequired();

        builder.HasMany(x => x.Urunler)
            .WithOne(x => x.Siparis)
            .HasForeignKey(x => x.SiparisId);

                 
     builder.Property(x => x.Status) // Entity'nizdeki property adı (Enum olan)
            .HasConversion(
                v => (int)v,          // Enum değerini DB'ye int (1, 2, 3) olarak yazar
                v => (SiparisDurum)v  // DB'deki int değeri koda Enum olarak okur
            )
            .HasColumnName("DurumId");
    }

}
