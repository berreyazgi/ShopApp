using MediatR;

namespace ShopApp.Application.SiparisUrunleri.Commands.UpdateSiparisUrunu;

public sealed record UpdateSiparisUrunuCommand(Guid SiparisId, Guid Id, int UrunMiktar) : IRequest;
