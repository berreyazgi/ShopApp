using MediatR;

namespace ShopApp.Application.Features.Siparis.Commands.CreateSiparis;

public sealed record CreateSiparisCommand : IRequest<Guid>;
