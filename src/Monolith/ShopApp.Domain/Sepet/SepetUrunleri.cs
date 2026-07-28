using src.Monolith.ShopApp.Domain.Common;

namespace src.Monolith.ShopApp.Domain.Sepet;

public class SepetUrunleri : BaseEntity
{
     public Guid SepetId { get; private set; }

    public Guid UrunCesidId{ get; private set; }

    public int UrunMiktar { get; private set; }

    public int UrunAdet { get; private set; }

    public decimal BirimFiyatSnapshot { get; private set; }

    public Sepet Sepet { get; private set; } = null!;
}