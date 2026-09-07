using MediatR;

namespace ShopApp.Application.Features.Siparis.Commands.DeleteSiparisUrunu;

public sealed record DeleteSiparisUrunuCommand(Guid SiparisId, Guid Id) : IRequest;
