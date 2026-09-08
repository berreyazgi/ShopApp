using MediatR;

namespace ShopApp.Application.Features.Siparis.Commands.CreateSiparisUrunu;

public sealed record CreateSiparisUrunuCommand(
    Guid SiparisId,
    Guid UrunId,
    Guid UrunTurId,
    string UrunIsmi,
    string? UrunAciklamasi,
    string? StokTakipNumarasi,
    int UrunMiktar,
    decimal UrunBirimFiyat,
    decimal IndirimOrani) : IRequest<Guid>;
