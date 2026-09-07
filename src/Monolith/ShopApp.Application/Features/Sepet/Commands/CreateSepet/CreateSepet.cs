using MediatR;

namespace ShopApp.Application.Features.Sepet.Commands.CreateSepet;

public sealed record CreateSepetCommand : IRequest<Guid>;
