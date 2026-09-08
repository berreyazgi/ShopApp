using MediatR;
using Microsoft.EntityFrameworkCore;
using ShopApp.Application.Common.Interfaces;
using src.Monolith.ShopApp.Domain.Kullanici;

namespace ShopApp.Application.Features.Adres.Commands.DeleteAddress;

public sealed record DeleteAddressCommand(Guid Id) : IRequest;

public sealed class DeleteAddressCommandHandler(
    IShopAppDbContext context,
    ICurrentCustomerContext currentCustomerContext) : IRequestHandler<DeleteAddressCommand>
{
    public async Task Handle(DeleteAddressCommand request, CancellationToken cancellationToken)
    {
        var customer = await currentCustomerContext.GetRequiredAsync(cancellationToken);

        var address = await context.Adresler
            .FirstOrDefaultAsync(a => a.Id == request.Id && a.MusteriId == customer.MusteriId, cancellationToken)
            ?? throw new KeyNotFoundException("Adres bulunamadı veya bu kullanıcıya ait değil.");

        context.Adresler.Remove(address);
        await context.SaveChangesAsync(cancellationToken);
    }
}
