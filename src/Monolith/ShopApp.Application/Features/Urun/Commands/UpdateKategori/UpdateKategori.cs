using MediatR;

namespace ShopApp.Application.Features.Urun.Commands.UpdateKategori;

public sealed record UpdateKategoriCommand(
    Guid Id,
    string KategoriAd,
    Guid? UstKategoriId,
    string? Detay,
    string? GorselUrl,
    bool AktifMi) : IRequest;
