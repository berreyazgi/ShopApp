using MediatR;

namespace ShopApp.Application.Dtos.SiparisDtos;

public record ResultSiparisDto(
    Guid Id,
    Guid MusteriId,
    string SiparisNumarasi,
    string DurumIsmi,
    decimal AraToplam,
    decimal IndirimOrani,
    decimal KargoFiyat,
    decimal ToplamFiyat
):IRequest<ResultSiparisDto>;