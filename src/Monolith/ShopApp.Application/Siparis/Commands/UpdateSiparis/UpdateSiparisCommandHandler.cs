using MediatR;
using ShopApp.Application.Abstractions;

namespace ShopApp.Application.Siparis.Commands.UpdateSiparis;

public sealed class UpdateSiparisCommandHandler(
    ISiparisRepository repository,
    ICurrentCustomerContext currentCustomerContext)
    : IRequestHandler<UpdateSiparisCommand>
{
    public async Task Handle(UpdateSiparisCommand request, CancellationToken cancellationToken)
    {
        var customer = await currentCustomerContext.GetRequiredAsync(cancellationToken);

        var siparis = await repository.GetByIdAsync(request.Id, cancellationToken);
        if (siparis is null || siparis.MusteriId != customer.MusteriId)
            throw new KeyNotFoundException($"Sipariş '{request.Id}' bulunamadı.");

        siparis.DurumGuncelle(request.YeniDurumId, customer.KullaniciId);
        await repository.UpdateAsync(siparis, cancellationToken);
    }
}
