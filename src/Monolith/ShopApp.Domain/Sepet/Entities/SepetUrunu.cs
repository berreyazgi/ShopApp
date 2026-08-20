using System.ComponentModel.DataAnnotations.Schema;
using src.Monolith.ShopApp.Domain.Common;

namespace src.Monolith.ShopApp.Domain.Sepet.Entities;

[Table("SepetUrunleri", Schema = "sales")]
public class SepetUrunu : BaseEntity
{
    [ForeignKey(nameof(SepetId))]
    public Guid SepetId { get; private set; }
    
    [ForeignKey(nameof(UrunTurId))]
    public Guid UrunTurId { get; private set; }

    public int UrunMiktar { get; private set; }

    public int UrunAdet { get; private set; }

    public decimal FiyatGecmis { get; private set; }

    public Sepet Sepet { get; private set; } = null!;
}