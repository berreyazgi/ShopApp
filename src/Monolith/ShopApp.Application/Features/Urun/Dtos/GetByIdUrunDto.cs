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
    List<GetByIdUrunTurDto> UrunTurleri
);
