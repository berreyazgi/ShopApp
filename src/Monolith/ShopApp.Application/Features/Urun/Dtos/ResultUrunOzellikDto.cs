namespace ShopApp.Application.Features.Urun.Dtos;

public record ResultUrunOzellikDto(
    Guid Id,
    Guid UrunTurId,
    string OzellikAd,
    string OzellikDeger
);
