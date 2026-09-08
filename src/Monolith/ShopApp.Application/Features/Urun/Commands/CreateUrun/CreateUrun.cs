using MediatR;

namespace ShopApp.Application.Features.Urun.Commands.CreateUrun;

public sealed record CreateUrunCommand(
    Guid KategoriId,
    string UrunAd,
    string? Detay,
    decimal Fiyat,
    string MarkaAd,
    decimal GecmisFiyat,
    string? GorselUrl,
    bool AktifMi) : IRequest<Guid>;