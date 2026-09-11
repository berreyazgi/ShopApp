namespace ShopApp.Application.Features.Siparis.Dtos;

public record ResultSiparisUrunleriDto(
    Guid Id,
    Guid SiparisId,
    Guid UrunId,
    Guid UrunVaryantId,
    string UrunIsmi,
    string? UrunAciklamasi,
    string? StokTakipNumarasi,
    string? Beden,
    string? Renk,
    int UrunMiktar,
    decimal UrunBirimFiyat,
    decimal IndirimOrani,
    decimal ToplamFiyat
);