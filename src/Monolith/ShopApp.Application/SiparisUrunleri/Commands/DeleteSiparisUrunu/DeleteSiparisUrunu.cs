using MediatR;

namespace ShopApp.Application.SiparisUrunleri.Commands.DeleteSiparisUrunu;

public sealed record DeleteSiparisUrunuCommand(Guid SiparisId, Guid Id) : IRequest;
