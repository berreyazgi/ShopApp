namespace ShopApp.Application.Dtos.SiparisDtos;

public record ResultSiparisDto(
    Guid Id,
    Guid MusteriId,
    string SiparisNumarasi,
    string DurumIsmi,
    decimal AraToplam,
    decimal IndirimTutari,
    decimal KargoFiyat,
    decimal ToplamFiyat
);