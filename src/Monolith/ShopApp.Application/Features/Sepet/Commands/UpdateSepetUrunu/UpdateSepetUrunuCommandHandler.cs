using MediatR;
using ShopApp.Application.Common.Interfaces;

namespace ShopApp.Application.Features.Sepet.Commands.UpdateSepetUrunu;

public sealed class UpdateSepetUrunuCommandHandler(
    ISepetRepository sepetRepository,
    ICurrentCustomerContext currentCustomerContext)
    : IRequestHandler<UpdateSepetUrunuCommand>
{
    public async Task Handle(UpdateSepetUrunuCommand request, CancellationToken cancellationToken)
    {
        var customer = await currentCustomerContext.GetRequiredAsync(cancellationToken);

        var sepet = await sepetRepository.GetByIdAsync(request.SepetId, cancellationToken);
        if (sepet is null || sepet.MusteriId != customer.MusteriId)
            throw new KeyNotFoundException($"Sepet '{request.SepetId}' bulunamadı.");

        var urun = sepet.Urunler.FirstOrDefault(x => x.Id == request.Id)
            ?? throw new KeyNotFoundException($"Sepet Ürünü '{request.Id}' bulunamadı.");

        urun.MiktarGuncelle(request.UrunMiktar, customer.KullaniciId);
        await sepetRepository.UpdateAsync(sepet, cancellationToken);
    }
}
