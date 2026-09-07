using MediatR;
using ShopApp.Application.Common.Interfaces;

namespace ShopApp.Application.Features.Sepet.Commands.UpdateSepet;

public sealed class UpdateSepetCommandHandler(
    ISepetRepository repository,
    ICurrentCustomerContext currentCustomerContext)
    : IRequestHandler<UpdateSepetCommand>
{
    public async Task Handle(UpdateSepetCommand request, CancellationToken cancellationToken)
    {
        var customer = await currentCustomerContext.GetRequiredAsync(cancellationToken);

        var sepet = await repository.GetByIdAsync(request.Id, cancellationToken);
        if (sepet is null || sepet.MusteriId != customer.MusteriId)
            throw new KeyNotFoundException($"Sepet '{request.Id}' bulunamadı.");

        sepet.DurumuGuncelle(request.DurumId, customer.KullaniciId);
        await repository.UpdateAsync(sepet, cancellationToken);
    }
}
