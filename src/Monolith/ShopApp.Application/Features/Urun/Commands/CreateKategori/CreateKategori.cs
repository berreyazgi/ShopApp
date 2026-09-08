using MediatR;

namespace ShopApp.Application.Features.Urun.Commands.CreateKategori;

public sealed record CreateKategoriCommand(
    string KategoriAd,
    Guid? UstKategoriId,
    string? Detay,
    string? GorselUrl,
    bool AktifMi) : IRequest<Guid>;
