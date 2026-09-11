using MediatR;

namespace ShopApp.Application.Features.Siparis.Commands.CreateSiparisUrunu;

public sealed record CreateSiparisUrunuCommand(
    Guid SiparisId,
    Guid UrunId,
    Guid UrunVaryantId,
    string UrunIsmi,
    string? UrunAciklamasi,
    string? StokTakipNumarasi,
    int UrunMiktar,
    decimal UrunBirimFiyat,
    decimal IndirimOrani,
    string? Beden = null,
    string? Renk = null) : IRequest<Guid>;
