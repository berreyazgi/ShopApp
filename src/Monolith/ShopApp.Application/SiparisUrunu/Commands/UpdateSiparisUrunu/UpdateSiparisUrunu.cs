using MediatR;

namespace ShopApp.Application.SiparisUrunu.Commands.UpdateSiparisUrunu;

public sealed record UpdateSiparisUrunuCommand(Guid SiparisId, Guid Id, int UrunMiktar) : IRequest;
