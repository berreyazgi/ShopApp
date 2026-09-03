using MediatR;

namespace ShopApp.Application.Dtos.SiparisUrunleriDto;

public record UpdateSiparisUrunleriDto(
    Guid Id,
    Guid SiparisId,
    int UrunMiktar
):IRequest<Guid>;