using System.ComponentModel.DataAnnotations.Schema;
using src.Monolith.ShopApp.Domain.Common;

namespace src.Monolith.ShopApp.Domain.Sepet;

[Table("SepetUrunleri", Schema = "sales")]
public class SepetUrunleri : BaseEntity
{
    public Guid SepetId { get; private set; }

    public Guid UrunTurId { get; private set; }

    public int UrunMiktar { get; private set; }

    public int UrunAdet { get; private set; }

    public decimal FiyatGecmis { get; private set; }

    public Sepet Sepet { get; private set; } = null!;
}