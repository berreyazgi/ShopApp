namespace ShopApp.Application.Features.Siparis.Dtos;

public record ResultSiparisUrunleriDto(
    Guid Id,
    Guid SiparisId,
    Guid UrunId,
    Guid UrunTurId,
    string UrunIsmi,
    string? UrunAciklamasi,
    string? StokTakipNumarasi,
    int UrunMiktar,
    decimal UrunBirimFiyat,
    decimal IndirimOrani,
    decimal ToplamFiyat
);