using System.ComponentModel.DataAnnotations;

namespace KargoServis.Domain.Common;

/// <summary>
/// Tüm kargo varlıkları için temel sınıf.
/// </summary>
public abstract class BaseEntity
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    public DateTime OlusturmaTarihi { get; set; } = DateTime.UtcNow;

    public DateTime? GuncellemeTarihi { get; set; }
}
