using MediatR;
using ShopApp.Application.Common.Interfaces;
using src.Monolith.ShopApp.Domain.Sepet.Entities;

namespace ShopApp.Application.Features.Sepet.Commands.CreateSepet;

public sealed class CreateSepetCommandHandler(
    ISepetRepository repository,
    ICurrentCustomerContext currentCustomerContext)
    : IRequestHandler<CreateSepetCommand, Guid>
{
    public async Task<Guid> Handle(CreateSepetCommand request, CancellationToken cancellationToken)
    {
        var customer = await currentCustomerContext.GetRequiredAsync(cancellationToken);
        var sepet = SepetEntity.Olustur(customer.MusteriId, customer.KullaniciId);

        await repository.AddAsync(sepet, cancellationToken);
        return sepet.Id;
    }
}
