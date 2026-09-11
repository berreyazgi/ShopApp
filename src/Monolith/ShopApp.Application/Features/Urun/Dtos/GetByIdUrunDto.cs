namespace ShopApp.Application.Features.Urun.Dtos;

public record GetByIdUrunDto(
    Guid Id,
    Guid KategoriId,
    string KategoriAd,
    string UrunAd,
    string? Detay,
    decimal Fiyat,
    string MarkaAd,
    decimal GecmisFiyat,
    string? GorselUrl,
    bool AktifMi,
    List<ResultUrunGorselDto> Gorseller,
    List<ResultUrunVaryantDto> Varyantlar,
    List<ResultUrunOzellikDto> Ozellikler,
    List<string>? ImageUrls = null
)
{
    public Guid CategoryId => KategoriId;
    public string CategoryName => KategoriAd;
    public string Name => UrunAd;
    public string? Description => Detay;
    public decimal Price => Fiyat;
    public string Brand => MarkaAd;
    public decimal PreviousPrice => GecmisFiyat;
    public string? ImageUrl => GorselUrl;
    public string? CoverImageUrl => GorselUrl;
    public bool IsActive => AktifMi;
    public List<ResultUrunGorselDto> Images => Gorseller;
}
