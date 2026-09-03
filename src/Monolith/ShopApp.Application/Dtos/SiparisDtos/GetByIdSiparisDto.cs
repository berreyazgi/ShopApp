using MediatR;

namespace ShopApp.Application.Dtos.SiparisDtos;

public record GetByIdSiparisDto(
    Guid Id
    ) : IRequest<ResultSiparisDto>;