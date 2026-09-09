namespace ShopApp.Application.Features.Urun.Dtos;

public record GetByIdUrunTurDto(
    Guid Id,
    Guid UrunId,
    string Ad,
    int StokAded,
    string StokKod,
    decimal FiyatFarki,
    bool AktifMi,
    List<ResultUrunOzellikDto> Ozellikler
);
