using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using KategoriServis.Domain.Common;

namespace KategoriServis.Domain.Entities;

[Table("Categories", Schema = "catalog")]
public class Category : BaseEntity
{
    [Required]
    [MaxLength(200)]
    public string Name { get; set; } = null!;

    /// <summary>
    /// URL-friendly slug for routing, e.g. "electronics/smartphones".
    /// Must be unique within the catalog.
    /// </summary>
    [Required]
    [MaxLength(220)]
    public string Slug { get; set; } = null!;

    [MaxLength(2000)]
    public string? Description { get; set; }

    /// <summary>Null means this is a root category.</summary>
    public Guid? ParentCategoryId { get; set; }

    [MaxLength(1000)]
    public string? ImageUrl { get; set; }

    public bool IsActive { get; set; } = true;

    // ── Navigation properties (intra-service only) ────────────────────────
    public Category? ParentCategory { get; set; }
    public ICollection<Category> SubCategories { get; set; } = new List<Category>();
    public ICollection<Product> Products { get; set; } = new List<Product>();
}
