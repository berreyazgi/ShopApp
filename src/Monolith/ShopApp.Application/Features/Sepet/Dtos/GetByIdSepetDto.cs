using MediatR;

namespace ShopApp.Application.Features.Sepet.Dtos;

public record GetByIdSepetDto(
    Guid Id):IRequest<Guid>;