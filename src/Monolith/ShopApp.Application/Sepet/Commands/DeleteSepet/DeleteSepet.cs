using MediatR;

namespace ShopApp.Application.Sepet.Commands.DeleteSepet;

public sealed record DeleteSepetCommand(Guid Id) : IRequest;
