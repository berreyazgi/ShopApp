using MediatR;

namespace ShopApp.Application.Features.Siparis.Commands.DeleteSiparis;

public sealed record DeleteSiparisCommand(Guid Id) : IRequest;
