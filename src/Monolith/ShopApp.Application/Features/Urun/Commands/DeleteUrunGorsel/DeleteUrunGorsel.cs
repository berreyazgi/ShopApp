using MediatR;

namespace ShopApp.Application.Features.Urun.Commands.DeleteUrunGorsel;

public sealed record DeleteUrunGorselCommand(
    Guid UrunId,
    Guid Id) : IRequest;
