using MediatR;
using ShopApp.Application.Common.Interfaces;

namespace ShopApp.Application.Features.Siparis.Commands.CreateSiparisUrunu;

public sealed class CreateSiparisUrunuCommandHandler(
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

        var urun = siparis.UrunEkle(
            request.UrunTurId,
            request.UrunId,
            request.UrunIsmi,
            request.UrunAciklamasi,
            request.StokTakipNumarasi,
            request.UrunMiktar,
            request.UrunBirimFiyat,
            request.IndirimOrani,
            customer.KullaniciId);

        await siparisRepository.UpdateAsync(siparis, cancellationToken);
        return urun.Id;
    }
}
