using MediatR;

namespace ShopApp.Application.SepetUrunleri.Dtos;

public record GetByIdSepetUrunDto(
    Guid Id):IRequest<Guid>;