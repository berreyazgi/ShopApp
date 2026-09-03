using MediatR;

namespace ShopApp.Application.Sepet.Commands.CreateSepet;

public sealed record CreateSepetCommand : IRequest<Guid>;
