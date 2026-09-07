using MediatR;
using ShopApp.Application.Common.Interfaces;

namespace ShopApp.Application.Features.Siparis.Commands.DeleteSiparisUrunu;

public sealed class DeleteSiparisUrunuCommandHandler(
    ISiparisRepository siparisRepository,
    ICurrentCustomerContext currentCustomerContext)
    : IRequestHandler<DeleteSiparisUrunuCommand>
{
    public async Task Handle(DeleteSiparisUrunuCommand request, CancellationToken cancellationToken)
    {
        var customer = await currentCustomerContext.GetRequiredAsync(cancellationToken);

        var siparis = await siparisRepository.GetByIdAsync(request.SiparisId, cancellationToken);
        if (siparis is null || siparis.MusteriId != customer.MusteriId)
            throw new KeyNotFoundException($"Sipariş '{request.SiparisId}' bulunamadı.");

        var urun = siparis.Urunler.FirstOrDefault(x => x.Id == request.Id)
            ?? throw new KeyNotFoundException($"Sipariş Ürünü '{request.Id}' bulunamadı.");

        siparis.UrunSil(urun);
        await siparisRepository.UpdateAsync(siparis, cancellationToken);
    }
}
