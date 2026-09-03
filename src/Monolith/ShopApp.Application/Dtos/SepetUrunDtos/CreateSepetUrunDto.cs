using MediatR;

namespace ShopApp.Application.Dtos.SepetUrunDtos;

public record CreateSepetUrunDto(
    Guid SepetId,
    Guid UrunTurId,
    int UrunMiktar,
    decimal BirimFİyat
    ): IRequest<Guid>;