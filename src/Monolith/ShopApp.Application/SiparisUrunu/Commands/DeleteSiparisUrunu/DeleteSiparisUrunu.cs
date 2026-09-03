using MediatR;

namespace ShopApp.Application.SiparisUrunu.Commands.DeleteSiparisUrunu;

public sealed record DeleteSiparisUrunuCommand(Guid SiparisId, Guid Id) : IRequest;
