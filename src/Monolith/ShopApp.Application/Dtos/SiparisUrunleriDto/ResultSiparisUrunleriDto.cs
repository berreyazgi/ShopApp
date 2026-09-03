namespace ShopApp.Application.Dtos.SiparisUrunleriDto;

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