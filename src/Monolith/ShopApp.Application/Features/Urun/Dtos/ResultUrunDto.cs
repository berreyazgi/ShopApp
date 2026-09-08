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
    bool AktifMi
);
