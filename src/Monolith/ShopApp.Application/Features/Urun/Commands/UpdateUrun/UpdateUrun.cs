using MediatR;

namespace ShopApp.Application.Features.Urun.Commands.UpdateUrun;

public sealed record UpdateUrunCommand(
    Guid Id,
    Guid KategoriId,
    string UrunAd,
    string? Detay,
    decimal Fiyat,
    string MarkaAd,
    decimal GecmisFiyat,
    string? GorselUrl,
    bool AktifMi) : IRequest;
