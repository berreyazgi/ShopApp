namespace ShopApp.Application.Features.Adres.Dtos;

public record AddressDto(
    Guid Id,
    Guid MusteriId,
    string? AdresBilgisi,
    string? Telefon,
    int Ulke,
    int Sehir,
    int Ilce,
    int Mahalle,
    int PostaKodu,
    DateTime OlusturmaTarihi,
    DateTime? GuncellemeTarihi
);
