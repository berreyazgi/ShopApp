using MediatR;

namespace ShopApp.Application.Features.Sepet.Commands.UpdateSepetUrunu;

public sealed record UpdateSepetUrunuCommand(Guid SepetId, Guid Id, int UrunMiktar) : IRequest;
