using MediatR;

namespace ShopApp.Application.SepetUrunleri.Commands.UpdateSepetUrunu;

public sealed record UpdateSepetUrunuCommand(Guid SepetId, Guid Id, int UrunMiktar, int UrunAdet) : IRequest;
