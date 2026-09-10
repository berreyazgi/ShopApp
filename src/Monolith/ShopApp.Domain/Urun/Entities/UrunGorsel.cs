using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using src.Monolith.ShopApp.Domain.Common;

namespace ShopApp.Domain.Urun.Entities;

public class UrunGorsel : BaseEntity
{
    public Guid UrunId { get; set; }

    [NotMapped]
    public Guid ProductId
    {
        get => UrunId;
        set => UrunId = value;
    }

    [Required]
    public string GorselUrl { get; set; } = null!;

    [NotMapped]
    public string ImageUrl
    {
        get => GorselUrl;
        set => GorselUrl = value;
    }

    public int GorselSira { get; set; }

    [NotMapped]
    public int DisplayOrder
    {
        get => GorselSira;
        set => GorselSira = value;
    }

    public bool AnaGorselMi { get; set; } = false;

    [NotMapped]
    public bool IsMain
    {
        get => AnaGorselMi;
        set => AnaGorselMi = value;
    }

    public Urun Urun { get; set; } = null!;
}