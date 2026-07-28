using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ShopApp.Infrastructure.Identity;

namespace ShopApp.Infrastructure.Persistence.Configurations;

public class ApplicationUserConfiguration : IEntityTypeConfiguration<ApplicationUser>
{
     public void Configure(
        EntityTypeBuilder<ApplicationUser> builder)
    {
        builder.ToTable("Users", "identity");

        builder.Property(x => x.Ad)
            .IsRequired()
            .HasMaxLength(500);

        builder.Property(x => x.Soyad)
            .IsRequired()
            .HasMaxLength(500);

        builder.Property(x => x.durum)
            .IsRequired()
            .HasDefaultValue(true);

        builder.Property(x => x.OlusturmaTarihi)
            .IsRequired();

        builder.Property(x => x.GuncellemeTarihi)
            .IsRequired(false);
    }
}