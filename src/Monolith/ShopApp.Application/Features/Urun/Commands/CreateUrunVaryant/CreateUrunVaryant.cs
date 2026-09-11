using MediatR;

namespace ShopApp.Application.Features.Urun.Commands.CreateUrunVaryant;

public sealed record CreateUrunVaryantCommand(
    Guid UrunId,
    string? Beden,
    string? Renk,
    int StokAdet,
    string StokKod,
    decimal FiyatFarki,
    bool AktifMi) : IRequest<Guid>;
