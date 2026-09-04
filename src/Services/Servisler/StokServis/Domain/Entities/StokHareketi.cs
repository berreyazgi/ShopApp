using StokServis.Domain.Common;
using StokServis.Domain.Enums;

namespace StokServis.Domain.Entities;

public class StokHareketi : BaseEntity
{
    public Guid StokKalemiId { get; set; }

    public HareketTipi HareketTipi { get; set; }

    public int Miktar { get; set; }

    public string? Aciklama { get; set; }

    public Guid? ReferansId { get; set; }

    // Navigation property
    public StokUrunleri StokUrunleri { get; set; } = null!;
}
