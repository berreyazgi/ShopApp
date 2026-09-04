using MediatR;
using ShopApp.Application.Abstractions;

namespace ShopApp.Application.SiparisUrunleri.Commands.UpdateSiparisUrunu;

public sealed class UpdateSiparisUrunuCommandHandler(
    ISiparisUrunuRepository repository,
    ICurrentCustomerContext currentCustomerContext)
    : IRequestHandler<UpdateSiparisUrunuCommand>
{
    public async Task Handle(UpdateSiparisUrunuCommand request, CancellationToken cancellationToken)
    {
        var customer = await currentCustomerContext.GetRequiredAsync(cancellationToken);

        var urun = await repository.GetByIdAsync(request.SiparisId, request.Id, cancellationToken);
        if (urun is null || urun.SiparisEntity.MusteriId != customer.MusteriId)
            throw new KeyNotFoundException($"Sipariş Ürünü '{request.Id}' bulunamadı.");

        urun.MiktarGuncelle(request.UrunMiktar, customer.KullaniciId);
        await repository.UpdateAsync(urun, cancellationToken);
    }
}
