namespace ShopApp.Application.Features.Urun.Dtos;

public record ResultKategoriDto(
    Guid Id,
    string KategoriAd,
    Guid? UstKategoriId,
    string? Detay,
    string? GorselUrl,
    bool AktifMi
);
