using MediatR;

namespace ShopApp.Application.Dtos.SiparisDtos;

public record UpdateSiparisDto(Guid Id, int YeniDurumId) : IRequest;