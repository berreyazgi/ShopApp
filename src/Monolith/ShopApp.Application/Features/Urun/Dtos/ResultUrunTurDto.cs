namespace ShopApp.Application.Features.Urun.Dtos;

public record ResultUrunTurDto(
    Guid Id,
    Guid UrunId,
    string Ad,
    int StokAded,
    string StokKod,
    decimal FiyatFarki,
    bool AktifMi
);
