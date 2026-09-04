using MediatR;
using ShopApp.Application.Abstractions;

namespace ShopApp.Application.Sepet.Commands.DeleteSepet;

public sealed class DeleteSepetCommandHandler(
    ISepetRepository repository,
    ICurrentCustomerContext currentCustomerContext)
    : IRequestHandler<DeleteSepetCommand>
{
    public async Task Handle(DeleteSepetCommand request, CancellationToken cancellationToken)
    {
        var customer = await currentCustomerContext.GetRequiredAsync(cancellationToken);

        var sepet = await repository.GetByIdAsync(request.Id, cancellationToken);
        if (sepet is null || sepet.MusteriId != customer.MusteriId)
            throw new KeyNotFoundException($"Sepet '{request.Id}' bulunamadı.");

        await repository.DeleteAsync(sepet, cancellationToken);
    }
}
