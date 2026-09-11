using System.ComponentModel.DataAnnotations;
using src.Monolith.ShopApp.Domain.Common;

namespace ShopApp.Domain.Urun.Entities;

public class UrunOzellik : BaseEntity
{
    public Guid UrunId { get; set; }

    [Required]
    [MaxLength(200)]
    public string OzellikAd { get; set; } = null!;

    [Required]
    [MaxLength(500)]
    public string Deger { get; set; } = null!;

    public int Siralama { get; set; }

    public Urun Urun { get; set; } = null!;

    private UrunOzellik()
    {
    }

    public UrunOzellik(Guid urunId, string ozellikAd, string deger, int siralama = 0)
    {
        UrunId = urunId;
        OzellikAd = ozellikAd;
        Deger = deger;
        Siralama = siralama;
    }
    
}