using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using src.Monolith.ShopApp.Domain.Common;

namespace ShopApp.Domain.Urun.Entities;

public class UrunOzellik : BaseEntity
{
    [Column("UrunTipiId")]
    public Guid UrunTurId { get; set; }

    [Required]
    [MaxLength(200)]
    public string OzellikAd { get; set; } = null!;

    [Required]
    [MaxLength(500)]
    public string OzellikDeger { get; set; } = null!;

    // Navigation property
    public UrunTur UrunTur { get; set; } = null!;

    public UrunOzellik(string ozellikAd, string ozellikDeger, Guid urunTurId)
    {
        OzellikAd = ozellikAd;
        OzellikDeger = ozellikDeger;
        UrunTurId = urunTurId;
    }
}