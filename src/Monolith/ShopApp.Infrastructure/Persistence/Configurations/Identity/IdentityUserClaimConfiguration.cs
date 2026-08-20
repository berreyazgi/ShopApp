using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ShopApp.Infrastructure.Persistence.Configurations.Identity;

public sealed class IdentityUserClaimConfiguration : IEntityTypeConfiguration<IdentityUserClaim<Guid>>
{
    public void Configure(EntityTypeBuilder<IdentityUserClaim<Guid>> builder)
    {
        builder.ToTable("UserClaims", "identity");
    }
}
