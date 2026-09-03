using MediatR;

namespace ShopApp.Application.Dtos.SepetUrunDtos;

public record GetByIdSepetUrunDto(
    Guid Id):IRequest<Guid>;