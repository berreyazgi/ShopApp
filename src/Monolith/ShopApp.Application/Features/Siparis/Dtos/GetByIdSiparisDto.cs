using MediatR;

namespace ShopApp.Application.Features.Siparis.Dtos;

public record GetByIdSiparisDto(
    Guid Id
    ) : IRequest<ResultSiparisDto>;