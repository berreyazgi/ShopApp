using MediatR;

namespace ShopApp.Application.Features.Sepet.Commands.DeleteSepet;

public sealed record DeleteSepetCommand(Guid Id) : IRequest;
