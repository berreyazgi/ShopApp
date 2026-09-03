using MediatR;

namespace ShopApp.Application.Sepet.Commands.UpdateSepet;

public sealed record UpdateSepetCommand(Guid Id, int DurumId) : IRequest;
