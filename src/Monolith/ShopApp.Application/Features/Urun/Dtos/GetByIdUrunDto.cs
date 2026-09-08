using MediatR;

namespace ShopApp.Application.Features.Urun.Dtos;

public record GetByIdUrunDto(Guid Id) :IRequest<Guid>;