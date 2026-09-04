using MediatR;

namespace ShopApp.Application.SepetUrunleri.Commands.CreateSepetUrunu;

public sealed record CreateSepetUrunuCommand(
    Guid SepetId,
    Guid UrunTurId,
    int UrunMiktar,
    decimal FiyatGecmis) : IRequest<Guid>;
