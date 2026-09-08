using MediatR;

namespace ShopApp.Application.Features.Urun.Commands.CreateUrunOzellik;

public sealed record CreateUrunOzellikCommand(
    Guid UrunTurId,
    string OzellikAd,
    string OzellikDeger) : IRequest<Guid>;
