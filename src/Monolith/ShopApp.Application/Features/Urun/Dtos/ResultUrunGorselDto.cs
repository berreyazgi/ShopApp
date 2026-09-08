namespace ShopApp.Application.Features.Urun.Dtos;

public record ResultUrunGorselDto(
    Guid Id,
    Guid UrunId,
    string GorselUrl,
    int GorselSira
);
