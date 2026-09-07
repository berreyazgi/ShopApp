using MediatR;

namespace ShopApp.Application.Features.Sepet.Commands.UpdateSepet;

public sealed record UpdateSepetCommand(Guid Id, int DurumId) : IRequest;
