using MediatR;

namespace ShopApp.Application.Dtos.SepetDtos;

public record ResultSepetDto(
    Guid Id,
    Guid MusteriId,
    int DurumId,
    DateTime OlusturmaTarihi
    ):IRequest<Guid>;