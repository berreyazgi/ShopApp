using MediatR;

namespace ShopApp.Application.Dtos.SiparisUrunleriDto;

public record CreateSiparisUrunleriDto(
    Guid SiparisId,
    Guid UrunTurId,
    string SiparisNumarasi,
    string UrunIsmi,
    decimal UrunBirimFiyat

    ): IRequest<Guid>;