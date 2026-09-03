using src.Monolith.ShopApp.Domain.Common;

namespace src.Monolith.ShopApp.Domain.Sepet.Entities;

public class SepetUrunu : BaseEntity
{
    public Guid SepetId { get; private set; }

    public Guid UrunTurId { get; private set; }

    public int UrunMiktar { get; private set; }

    public int UrunAdet { get; private set; }

    public decimal FiyatGecmis { get; private set; }

    public SepetEntity SepetEntity { get; private set; } = null!;
}