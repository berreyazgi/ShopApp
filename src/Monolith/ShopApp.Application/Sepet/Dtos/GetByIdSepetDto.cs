using MediatR;

namespace ShopApp.Application.Sepet.Dtos;

public record GetByIdSepetDto(
    Guid Id):IRequest<Guid>;