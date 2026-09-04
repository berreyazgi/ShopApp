using MediatR;

namespace ShopApp.Application.SiparisUrunleri.Dtos;

public record GetByIdSiparisUrunleriDto(Guid Id): IRequest<Guid>;