using StokServis.Domain.Common;

namespace StokServis.Domain.Entities;

public class Depo : BaseEntity
{
    public string DepoIsmi { get; set; } = null!;

    public string DepoAdresi { get; set; } = null!;

    public int Sehir { get; set; }

    public bool AktifMi { get; set; } = true;

    // Navigation property
    public ICollection<StokUrunleri> StokKalemleri { get; set; } = new List<StokUrunleri>();
}
