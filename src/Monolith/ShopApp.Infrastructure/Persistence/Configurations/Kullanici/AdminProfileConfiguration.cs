using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ShopApp.Infrastructure.Identity.Models;
using src.Monolith.ShopApp.Domain.Kullanici;

namespace ShopApp.Infrastructure.Persistence.Configurations.Kullanici;

public sealed class AdminProfileConfiguration : IEntityTypeConfiguration<AdminProfile>
{
    public void Configure(EntityTypeBuilder<AdminProfile> builder)
    {
        builder.ToTable("AdminProfilleri", "kimlik");

        builder.Property(x => x.KullaniciId)
            .IsRequired();

        builder.HasIndex(x => x.KullaniciId)
            .IsUnique();

        builder.HasOne<KayitliKullanici>()
            .WithOne()
            .HasForeignKey<AdminProfile>(x => x.KullaniciId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
