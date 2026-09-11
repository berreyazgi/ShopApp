namespace ShopApp.Application.Features.Urun.Dtos;

public record GetByIdUrunOzellikDto(
    Guid Id,
    Guid UrunId,
    string OzellikAd,
    string Deger,
    int Siralama
);
