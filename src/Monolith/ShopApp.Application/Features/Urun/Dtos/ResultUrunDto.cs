namespace ShopApp.Application.Features.Urun.Dtos;

public record ResultUrunDto(
    Guid Id,
    Guid KategoriId,
    string UrunAd,
    string? Detay,
    decimal Fiyat,
    string MarkaAd,
    decimal GecmisFiyat,
    string? GorselUrl,
    bool AktifMi,
    List<ResultUrunGorselDto>? Gorseller = null,
    List<string>? ImageUrls = null
)
{
    public Guid CategoryId => KategoriId;
    public string Name => UrunAd;
    public string? Description => Detay;
    public decimal Price => Fiyat;
    public string Brand => MarkaAd;
    public decimal PreviousPrice => GecmisFiyat;
    public string? ImageUrl => GorselUrl;
    public string? CoverImageUrl => GorselUrl;
    public bool IsActive => AktifMi;
    public List<ResultUrunGorselDto> Images => Gorseller ?? [];
}
