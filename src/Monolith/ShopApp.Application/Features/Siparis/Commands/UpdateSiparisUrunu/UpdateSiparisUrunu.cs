using MediatR;

namespace ShopApp.Application.Features.Siparis.Commands.UpdateSiparisUrunu;

public sealed record UpdateSiparisUrunuCommand(Guid SiparisId, Guid Id, int UrunMiktar) : IRequest;
