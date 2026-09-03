using MediatR;

namespace ShopApp.Application.Dtos.SepetDtos;

public record UpdateSepetDto(
    Guid Id,
    Guid MusteriId,
    int DurumId) : IRequest<Guid>;