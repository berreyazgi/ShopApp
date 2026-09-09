using MediatR;

namespace ShopApp.Application.Features.Urun.Commands.DeleteUrunOzellik;

public sealed record DeleteUrunOzellikCommand(
    Guid UrunTurId,
    Guid Id) : IRequest;
