using MediatR;

namespace ShopApp.Application.Dtos.SepetUrunDtos;

public record UpdateSepetUrunDto(
    Guid Id,
    Guid SepetId,
    int UrunMiktar
    ):IRequest<Guid>;