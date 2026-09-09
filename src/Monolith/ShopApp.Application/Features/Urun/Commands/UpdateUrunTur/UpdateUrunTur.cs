using MediatR;

namespace ShopApp.Application.Features.Urun.Commands.UpdateUrunTur;

public sealed record UpdateUrunTurCommand(
    Guid UrunId,
    Guid Id,
    string Ad,
    int StokAded,
    string StokKod,
    decimal FiyatFarki,
    bool AktifMi) : IRequest;
