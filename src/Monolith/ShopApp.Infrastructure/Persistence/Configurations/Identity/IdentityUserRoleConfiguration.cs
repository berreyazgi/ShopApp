using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ShopApp.Infrastructure.Persistence.Configurations.Identity;

public sealed class IdentityUserRoleConfiguration : IEntityTypeConfiguration<IdentityUserRole<Guid>>
{
    public void Configure(EntityTypeBuilder<IdentityUserRole<Guid>> builder)
    {
        builder.ToTable("UserRoles", "identity");
    }
}
