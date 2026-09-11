using MediatR;

namespace ShopApp.Application.Features.Urun.Commands.DeleteUrunOzellik;

public sealed record DeleteUrunOzellikCommand(
    Guid UrunId,
    Guid Id) : IRequest;
