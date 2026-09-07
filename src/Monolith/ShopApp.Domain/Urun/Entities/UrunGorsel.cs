using System.ComponentModel.DataAnnotations;
using src.Monolith.ShopApp.Domain.Common;

namespace ShopApp.Domain.Urun.Entities;

public class UrunGorsel : BaseEntity
{
    public Guid UrunId { get; set; }

    [Required]
    public string GorselUrl { get; set; } = null!;

    public int GorselSira { get; set; }

    public Urun Urun { get; set; } = null!;
}