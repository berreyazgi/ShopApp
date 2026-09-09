namespace ShopApp.Application.Features.Urun.Dtos;

public record GetByIdUrunGorselDto(
    Guid Id,
    Guid UrunId,
    string GorselUrl,
    int GorselSira
);
