using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using src.Monolith.ShopApp.Domain.Common;

namespace ShopApp.Infrastructure.Persistence.Configurations.Common;

public abstract class BaseEntityConfiguration<T> : IEntityTypeConfiguration<T> where T : BaseEntity
{
    public virtual void Configure(EntityTypeBuilder<T> builder)
    {
        builder.HasKey(x => x.Id);

        // Id is always generated client-side (BaseEntity.Id = Guid.NewGuid()
        // at construction), never by the database. Without this, EF Core's
        // default Guid-key convention assumes a non-default key means the
        // row already exists — which misclassifies a brand-new entity
        // reachable via navigation-fixup (e.g. adding a child to an
        // already-tracked parent's collection) as Modified instead of
        // Added, producing an UPDATE for a row that was never inserted.
        builder.Property(x => x.Id)
            .ValueGeneratedNever();

        builder.Property(x => x.OlusturmaTarihi)
            .IsRequired();

        builder.Property(x => x.OlusturanKullaniciId)
            .IsRequired();
    }
}
