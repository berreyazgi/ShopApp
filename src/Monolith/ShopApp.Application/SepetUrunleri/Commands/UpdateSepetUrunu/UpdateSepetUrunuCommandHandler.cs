using MediatR;
using ShopApp.Application.Abstractions;

namespace ShopApp.Application.SepetUrunleri.Commands.UpdateSepetUrunu;

public sealed class UpdateSepetUrunuCommandHandler(
    ISepetUrunuRepository repository,
    ICurrentCustomerContext currentCustomerContext)
    : IRequestHandler<UpdateSepetUrunuCommand>
{
    public async Task Handle(UpdateSepetUrunuCommand request, CancellationToken cancellationToken)
    {
        var customer = await currentCustomerContext.GetRequiredAsync(cancellationToken);

        var urun = await repository.GetByIdAsync(request.SepetId, request.Id, cancellationToken);
        if (urun is null || urun.SepetEntity.MusteriId != customer.MusteriId)
            throw new KeyNotFoundException($"Sepet Ürünü '{request.Id}' bulunamadı.");

        urun.MiktarGuncelle(request.UrunMiktar, request.UrunAdet, customer.KullaniciId);
        await repository.UpdateAsync(urun, cancellationToken);
    }
}
