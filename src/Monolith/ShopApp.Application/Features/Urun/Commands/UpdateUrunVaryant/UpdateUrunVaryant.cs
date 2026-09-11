using MediatR;

namespace ShopApp.Application.Features.Urun.Commands.UpdateUrunVaryant;

public sealed record UpdateUrunVaryantCommand(
    Guid UrunId,
    Guid Id,
    string? Beden,
    string? Renk,
    int StokAdet,
    string StokKod,
    decimal FiyatFarki,
    bool AktifMi) : IRequest;
