using MediatR;

namespace ShopApp.Application.SepetUrunleri.Commands.CreateSepetUrunu;

public sealed record CreateSepetUrunuCommand(
    Guid SepetId,
    Guid UrunTurId,
    int UrunMiktar,
    int UrunAdet,
    decimal FiyatGecmis) : IRequest<Guid>;
