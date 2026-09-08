using MediatR;

namespace ShopApp.Application.Features.Urun.Commands.CreateUrunTur;

public sealed record CreateUrunTurCommand(
    Guid UrunId,
    string Ad,
    int StokAded,
    string StokKod,
    decimal FiyatFarki,
    bool AktifMi) : IRequest<Guid>;
