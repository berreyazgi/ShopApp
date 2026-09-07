using MediatR;

namespace ShopApp.Application.Features.Sepet.Dtos;

public record GetByIdSepetUrunDto(
    Guid Id):IRequest<Guid>;