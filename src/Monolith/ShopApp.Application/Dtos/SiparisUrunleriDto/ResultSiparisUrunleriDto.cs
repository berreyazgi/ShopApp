using MediatR;

namespace ShopApp.Application.Dtos.SiparisUrunleriDto;

public record ResultSiparisUrunleriDto(
    Guid Id,
    Guid UrunTurId,
    string UrunIsmi,
    int UrunMiktar,
    decimal UrunBirimFiyat
    ): IRequest<Guid>
{
    public decimal ToplamTutar => UrunMiktar * UrunBirimFiyat;
}