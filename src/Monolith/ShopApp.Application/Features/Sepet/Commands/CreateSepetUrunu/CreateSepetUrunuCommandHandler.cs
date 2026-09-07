using MediatR;
using ShopApp.Application.Common.Interfaces;

namespace ShopApp.Application.Features.Sepet.Commands.CreateSepetUrunu;

public sealed class CreateSepetUrunuCommandHandler(
    ISepetRepository sepetRepository,
    ICurrentCustomerContext currentCustomerContext)
    : IRequestHandler<CreateSepetUrunuCommand, Guid>
{
    public async Task<Guid> Handle(CreateSepetUrunuCommand request, CancellationToken cancellationToken)
    {
        var customer = await currentCustomerContext.GetRequiredAsync(cancellationToken);

        var sepet = await sepetRepository.GetByIdAsync(request.SepetId, cancellationToken);
        if (sepet is null || sepet.MusteriId != customer.MusteriId)
            throw new KeyNotFoundException($"Sepet '{request.SepetId}' bulunamadı.");

        var urun = sepet.UrunEkle(
            request.UrunTurId,
            request.UrunMiktar,
            request.FiyatGecmis,
            customer.KullaniciId);

        await sepetRepository.UpdateAsync(sepet, cancellationToken);
        return urun.Id;
    }
}
