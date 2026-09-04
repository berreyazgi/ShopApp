namespace ShopApp.Application.SiparisUrunleri.Dtos;

public record ResultSiparisUrunleriDto(
    Guid Id,
    Guid SiparisId,
    Guid UrunTurId,
    string UrunIsmi,
    string? UrunAciklamasi,
    string? StokTakipNumarasi,
    int UrunMiktar,
    decimal UrunBirimFiyat,
    decimal IndirimOrani,
    decimal ToplamFiyat
);