namespace ShopApp.Application.Features.Urun.Dtos;

/// <summary>
/// Admin product list projection — like ResultUrunDto but additionally
/// carries ToplamStok (the sum of this product's persisted UrunTur.StokAded
/// rows), so the admin product list/card stock badge never has to fall back
/// to a fake/neutral value. Kept separate from the public ResultUrunDto/
/// UrunController contract, which has no need for stock.
/// </summary>
public sealed record AdminUrunListDto(
    Guid Id,
    Guid KategoriId,
    string UrunAd,
    string? Detay,
    decimal Fiyat,
    string MarkaAd,
    decimal GecmisFiyat,
    string? GorselUrl,
    bool AktifMi,
    int ToplamStok
);
