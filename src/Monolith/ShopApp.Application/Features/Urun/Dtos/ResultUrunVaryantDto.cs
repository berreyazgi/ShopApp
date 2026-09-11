namespace ShopApp.Application.Features.Urun.Dtos;

public record ResultUrunVaryantDto(
    Guid Id,
    Guid UrunId,
    string? Beden,
    string? Renk,
    int StokAdet,
    string StokKod,
    decimal FiyatFarki,
    bool AktifMi
);
