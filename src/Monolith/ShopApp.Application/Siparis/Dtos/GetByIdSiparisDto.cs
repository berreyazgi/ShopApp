using MediatR;

namespace ShopApp.Application.Siparis.Dtos;

public record GetByIdSiparisDto(
    Guid Id
    ) : IRequest<ResultSiparisDto>;