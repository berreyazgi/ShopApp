using MediatR;

namespace ShopApp.Application.Dtos.SiparisUrunleriDto;

public record GetByIdSiparisUrunleriDto(Guid Id): IRequest<Guid>;