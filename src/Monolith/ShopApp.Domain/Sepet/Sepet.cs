using System.ComponentModel.DataAnnotations.Schema;
using src.Monolith.ShopApp.Domain.Common;

namespace src.Monolith.ShopApp.Domain.Sepet;

public class Sepet : BaseEntity
{
    [ForeignKey("Musteri")]
    public Guid MusteriId { get; private set; }

    public SepetDurumLookup Durum { get; private set; } = null!;

    public ICollection<SepetUrunleri> Urunler { get; private set; } = [];
    
}
