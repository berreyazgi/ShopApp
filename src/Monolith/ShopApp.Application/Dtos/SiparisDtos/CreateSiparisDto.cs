using MediatR;

namespace ShopApp.Application.Dtos.SiparisDtos;

public record CreateSiparisDto(
    Guid MusteriId,
    decimal IndirimOrani
    ): IRequest<Guid>;