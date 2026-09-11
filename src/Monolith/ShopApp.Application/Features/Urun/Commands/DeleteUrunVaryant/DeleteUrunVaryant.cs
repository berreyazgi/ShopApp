using MediatR;

namespace ShopApp.Application.Features.Urun.Commands.DeleteUrunVaryant;

public sealed record DeleteUrunVaryantCommand(
    Guid UrunId,
    Guid Id) : IRequest;
