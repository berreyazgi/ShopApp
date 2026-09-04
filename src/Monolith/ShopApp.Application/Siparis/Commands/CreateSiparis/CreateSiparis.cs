using MediatR;

namespace ShopApp.Application.Siparis.Commands.CreateSiparis;

public sealed record CreateSiparisCommand : IRequest<Guid>;
