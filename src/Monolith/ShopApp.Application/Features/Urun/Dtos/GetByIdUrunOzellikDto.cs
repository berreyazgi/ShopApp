namespace ShopApp.Application.Features.Urun.Dtos;

public record GetByIdUrunOzellikDto(
    Guid Id,
    Guid UrunTurId,
    string OzellikAd,
    string OzellikDeger
);
