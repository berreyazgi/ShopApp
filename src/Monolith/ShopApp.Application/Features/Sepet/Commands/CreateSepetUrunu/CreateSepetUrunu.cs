using MediatR;

namespace ShopApp.Application.Features.Sepet.Commands.CreateSepetUrunu;

public sealed record CreateSepetUrunuCommand(
    Guid SepetId,
    Guid UrunTurId,
    int UrunMiktar,
    decimal FiyatGecmis) : IRequest<Guid>;
