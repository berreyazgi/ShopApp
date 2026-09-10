namespace ShopApp.Application.Features.Urun.Dtos;

/// <summary>
/// English alias DTO matching Product domain model.
/// </summary>
public record ProductDto(
    Guid Id,
    Guid CategoryId,
    string Name,
    string? Description,
    decimal Price,
    string Brand,
    decimal PreviousPrice,
    string? CoverImageUrl,
    bool IsActive,
    List<string>? ImageUrls = null,
    List<ProductImageDto>? Images = null
);

/// <summary>
/// English alias DTO matching ProductImage entity.
/// </summary>
public record ProductImageDto(
    Guid Id,
    Guid ProductId,
    string ImageUrl,
    int DisplayOrder,
    bool IsMain
);
