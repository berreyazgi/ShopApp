using MediatR;

namespace ShopApp.Application.Dtos.SepetDtos;

public record GetByIdSepetDto(
    Guid Id):IRequest<Guid>;