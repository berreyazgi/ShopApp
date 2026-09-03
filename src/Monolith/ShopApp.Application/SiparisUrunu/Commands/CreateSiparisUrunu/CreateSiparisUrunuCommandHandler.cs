using MediatR;
using ShopApp.Application.Abstractions;
using SiparisUrunleriEntity = src.Monolith.ShopApp.Domain.Siparisler.SiparisUrunleri;

namespace ShopApp.Application.SiparisUrunu.Commands.CreateSiparisUrunu;

public sealed class CreateSiparisUrunuCommandHandler(
    ISiparisUrunuRepository repository,
    ISiparisRepository siparisRepository,
    ICurrentCustomerContext currentCustomerContext)
    : IRequestHandler<CreateSiparisUrunuCommand, Guid>
{
    public async Task<Guid> Handle(CreateSiparisUrunuCommand request, CancellationToken cancellationToken)
    {
        var customer = await currentCustomerContext.GetRequiredAsync(cancellationToken);

        var siparis = await siparisRepository.GetByIdAsync(request.SiparisId, cancellationToken);
        if (siparis is null || siparis.MusteriId != customer.MusteriId)
            throw new KeyNotFoundException($"Sipariş '{request.SiparisId}' bulunamadı.");

        var urun = SiparisUrunleriEntity.Olustur(
            request.SiparisId,
            request.UrunTurId,
            request.UrunIsmi,
            request.UrunAciklamasi,
            request.StokTakipNumarasi,
            request.UrunMiktar,
            request.UrunBirimFiyat,
            request.IndirimOrani,
            customer.KullaniciId);

        await repository.AddAsync(urun, cancellationToken);
        return urun.Id;
    }
}
