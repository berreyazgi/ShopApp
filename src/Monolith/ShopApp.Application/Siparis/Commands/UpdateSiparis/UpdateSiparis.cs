using MediatR;

namespace ShopApp.Application.Siparis.Commands.UpdateSiparis;

public sealed record UpdateSiparisCommand(Guid Id, int YeniDurumId) : IRequest;
