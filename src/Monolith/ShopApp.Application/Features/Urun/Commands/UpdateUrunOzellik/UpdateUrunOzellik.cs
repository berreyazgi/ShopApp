using MediatR;

namespace ShopApp.Application.Features.Urun.Commands.UpdateUrunOzellik;

public sealed record UpdateUrunOzellikCommand(
    Guid UrunTurId,
    Guid Id,
    string OzellikAd,
    string OzellikDeger) : IRequest;
