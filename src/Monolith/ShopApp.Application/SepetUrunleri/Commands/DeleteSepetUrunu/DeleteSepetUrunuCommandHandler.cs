using MediatR;
using ShopApp.Application.Abstractions;

namespace ShopApp.Application.SepetUrunleri.Commands.DeleteSepetUrunu;

public sealed class DeleteSepetUrunuCommandHandler(
    ISepetUrunuRepository repository,
    ICurrentCustomerContext currentCustomerContext)
    : IRequestHandler<DeleteSepetUrunuCommand>
{
    public async Task Handle(DeleteSepetUrunuCommand request, CancellationToken cancellationToken)
    {
        var customer = await currentCustomerContext.GetRequiredAsync(cancellationToken);

        var urun = await repository.GetByIdAsync(request.SepetId, request.Id, cancellationToken);
        if (urun is null || urun.SepetEntity.MusteriId != customer.MusteriId)
            throw new KeyNotFoundException($"Sepet Ürünü '{request.Id}' bulunamadı.");

        await repository.DeleteAsync(urun, cancellationToken);
    }
}
