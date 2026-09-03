using MediatR;

namespace ShopApp.Application.Dtos.SepetDtos;

public record CreateSepetDto(
    Guid MusteriId,
    string Durum
    ):IRequest<Guid>;