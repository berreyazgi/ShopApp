using StokServis.Domain.Common;

namespace StokServis.Domain.Entities;

public class StokUrunleri : BaseEntity
{
    public Guid UrunTurId { get; set; }

    public Guid DepoId { get; set; }

    public int StokUrunMiktar { get; set; }
    
    public int RezerveMiktar { get; set; }

    public int KullanilabilirMiktar => StokUrunMiktar - RezerveMiktar;

    public string? DepoKonumu { get; set; }

    public int? YenidenSiparisSeviyesi { get; set; }
    
    public Depo Depo { get; set; } = null!;
    public ICollection<StokHareketi> Hareketler { get; set; } = new List<StokHareketi>();
}
