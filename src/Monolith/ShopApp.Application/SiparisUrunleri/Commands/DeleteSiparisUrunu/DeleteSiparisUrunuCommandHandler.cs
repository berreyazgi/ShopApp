using MediatR;
using ShopApp.Application.Abstractions;

namespace ShopApp.Application.SiparisUrunleri.Commands.DeleteSiparisUrunu;

public sealed class DeleteSiparisUrunuCommandHandler(
    ISiparisUrunuRepository repository,
    ICurrentCustomerContext currentCustomerContext)
    : IRequestHandler<DeleteSiparisUrunuCommand>
{
    public async Task Handle(DeleteSiparisUrunuCommand request, CancellationToken cancellationToken)
    {
        var customer = await currentCustomerContext.GetRequiredAsync(cancellationToken);

        var urun = await repository.GetByIdAsync(request.SiparisId, request.Id, cancellationToken);
        if (urun is null || urun.SiparisEntity.MusteriId != customer.MusteriId)
            throw new KeyNotFoundException($"Sipariş Ürünü '{request.Id}' bulunamadı.");

        await repository.DeleteAsync(urun, cancellationToken);
    }
}
