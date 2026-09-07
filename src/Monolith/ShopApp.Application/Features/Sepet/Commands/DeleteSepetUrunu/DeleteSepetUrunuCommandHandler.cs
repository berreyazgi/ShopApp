using MediatR;
using ShopApp.Application.Common.Interfaces;

namespace ShopApp.Application.Features.Sepet.Commands.DeleteSepetUrunu;

public sealed class DeleteSepetUrunuCommandHandler(
    ISepetRepository sepetRepository,
    ICurrentCustomerContext currentCustomerContext)
    : IRequestHandler<DeleteSepetUrunuCommand>
{
    public async Task Handle(DeleteSepetUrunuCommand request, CancellationToken cancellationToken)
    {
        var customer = await currentCustomerContext.GetRequiredAsync(cancellationToken);

        var sepet = await sepetRepository.GetByIdAsync(request.SepetId, cancellationToken);
        if (sepet is null || sepet.MusteriId != customer.MusteriId)
            throw new KeyNotFoundException($"Sepet '{request.SepetId}' bulunamadı.");

        var urun = sepet.Urunler.FirstOrDefault(x => x.Id == request.Id)
            ?? throw new KeyNotFoundException($"Sepet Ürünü '{request.Id}' bulunamadı.");

        sepet.UrunSil(urun);
        await sepetRepository.UpdateAsync(sepet, cancellationToken);
    }
}
