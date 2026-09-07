namespace ShopApp.Application.Features.Adres.Dtos;

public record AddressDto(
    Guid Id,
    Guid MusteriId,
    string? AdresBilgisi,
    int Ulke,
    int Sehir,
    int Ilce,
    string PostaKodu,
    DateTime OlusturmaTarihi,
    DateTime? GuncellemeTarihi
);
