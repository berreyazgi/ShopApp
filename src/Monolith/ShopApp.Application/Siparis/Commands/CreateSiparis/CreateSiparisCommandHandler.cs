using MediatR;
using ShopApp.Application.Abstractions;
using src.Monolith.ShopApp.Domain.Siparisler;

namespace ShopApp.Application.Siparis.Commands.CreateSiparis;

public sealed class CreateSiparisCommandHandler(
    ISiparisRepository repository,
    ICurrentCustomerContext currentCustomerContext)
    : IRequestHandler<CreateSiparisCommand, Guid>
{
    public async Task<Guid> Handle(CreateSiparisCommand request, CancellationToken cancellationToken)
    {
        var customer = await currentCustomerContext.GetRequiredAsync(cancellationToken);
        var siparisNumarasi = $"SIP-{DateTime.UtcNow:yyyyMMddHHmmss}-{Guid.NewGuid().ToString("N")[..6].ToUpperInvariant()}";

        var siparis = SiparisEntity.Olustur(customer.MusteriId, siparisNumarasi, customer.KullaniciId);

        await repository.AddAsync(siparis, cancellationToken);
        return siparis.Id;
    }
}
