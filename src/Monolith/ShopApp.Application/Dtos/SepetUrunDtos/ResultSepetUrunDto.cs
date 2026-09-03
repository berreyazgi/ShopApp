using MediatR;

namespace ShopApp.Application.Dtos.SepetUrunDtos;

public record ResultSepetUrunDto(
    Guid Id,
    Guid UrunId,
    string UrunAdi,
    int Miktar,
    decimal BirimFiyat) : IRequest<Guid>
{
    public decimal ToplamTutar => Miktar * BirimFiyat;
}