using MediatR;
using ShopApp.Application.Abstractions;
using SepetUrunuEntity = src.Monolith.ShopApp.Domain.Sepet.Entities.SepetUrunu;

namespace ShopApp.Application.SepetUrunleri.Commands.CreateSepetUrunu;

public sealed class CreateSepetUrunuCommandHandler(
    ISepetUrunuRepository repository,
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

        var urun = SepetUrunuEntity.Olustur(
            request.SepetId,
            request.UrunTurId,
            request.UrunMiktar,
            request.FiyatGecmis,
            customer.KullaniciId);

        await repository.AddAsync(urun, cancellationToken);
        return urun.Id;
    }
}
