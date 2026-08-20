using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ShopApp.Infrastructure.Persistence.Configurations.Identity;

public sealed class IdentityUserLoginConfiguration : IEntityTypeConfiguration<IdentityUserLogin<Guid>>
{
    public void Configure(EntityTypeBuilder<IdentityUserLogin<Guid>> builder)
    {
        builder.ToTable("UserLogins", "identity");
    }
}
