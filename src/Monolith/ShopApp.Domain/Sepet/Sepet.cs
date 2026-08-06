using System.ComponentModel.DataAnnotations.Schema;
using src.Monolith.ShopApp.Domain.Common;

namespace src.Monolith.ShopApp.Domain.Sepet;

public class Sepet : BaseEntity
{
    [ForeignKey("Musteri")]
    public Guid MusteriId { get; private set; }

    public SepetDurum Durum { get; private set; } = SepetDurum.Aktif;

    public ICollection<SepetUrunleri> Urunleri { get; private set; } = new List<SepetUrunleri>();
}