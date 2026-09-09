using MediatR;

namespace ShopApp.Application.Features.Urun.Commands.DeleteUrunTur;

public sealed record DeleteUrunTurCommand(
    Guid UrunId,
    Guid Id) : IRequest;
