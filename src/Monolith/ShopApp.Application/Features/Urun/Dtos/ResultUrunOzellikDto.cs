namespace ShopApp.Application.Features.Urun.Dtos;

public record ResultUrunOzellikDto(
    Guid Id,
    Guid UrunId,
    string OzellikAd,
    string Deger,
    int Siralama
);
