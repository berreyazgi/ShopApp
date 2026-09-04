using MediatR;

namespace ShopApp.Application.Siparis.Commands.DeleteSiparis;

public sealed record DeleteSiparisCommand(Guid Id) : IRequest;
