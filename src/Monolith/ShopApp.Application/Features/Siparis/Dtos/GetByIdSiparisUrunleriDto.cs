using MediatR;

namespace ShopApp.Application.Features.Siparis.Dtos;

public record GetByIdSiparisUrunleriDto(Guid Id): IRequest<Guid>;