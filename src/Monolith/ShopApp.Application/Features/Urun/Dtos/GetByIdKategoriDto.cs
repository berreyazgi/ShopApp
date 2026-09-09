namespace ShopApp.Application.Features.Urun.Dtos;

public record GetByIdKategoriDto(
    Guid Id,
    string KategoriAd,
    Guid? UstKategoriId,
    string? Detay,
    string? GorselUrl,
    bool AktifMi,
    List<ResultKategoriDto> AltKategoriler
);
