using MediatR;
using ShopApp.Application.Abstractions;

namespace ShopApp.Application.Siparis.Commands.DeleteSiparis;

public sealed class DeleteSiparisCommandHandler(
    ISiparisRepository repository,
    ICurrentCustomerContext currentCustomerContext)
    : IRequestHandler<DeleteSiparisCommand>
{
    public async Task Handle(DeleteSiparisCommand request, CancellationToken cancellationToken)
    {
        var customer = await currentCustomerContext.GetRequiredAsync(cancellationToken);

        var siparis = await repository.GetByIdAsync(request.Id, cancellationToken);
        if (siparis is null || siparis.MusteriId != customer.MusteriId)
            throw new KeyNotFoundException($"Sipariş '{request.Id}' bulunamadı.");

        await repository.DeleteAsync(siparis, cancellationToken);
    }
}
