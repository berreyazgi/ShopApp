using MediatR;

namespace ShopApp.Application.Features.Siparis.Commands.UpdateSiparis;

public sealed record UpdateSiparisCommand(Guid Id, int YeniDurumId) : IRequest;
