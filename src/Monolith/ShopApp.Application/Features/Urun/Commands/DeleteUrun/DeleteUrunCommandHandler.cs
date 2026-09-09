using MediatR;
using ShopApp.Application.Common.Interfaces;
using UrunEntity = ShopApp.Domain.Urun.Entities.Urun;

namespace ShopApp.Application.Features.Urun.Commands.DeleteUrun;

public sealed class DeleteUrunCommandHandler(
    IGenericUrunRepository<UrunEntity> repository)
    : IRequestHandler<DeleteUrunCommand>
{
    public async Task Handle(DeleteUrunCommand request, CancellationToken cancellationToken)
    {
        var urun = await repository.GetByIdAsync(request.Id, cancellationToken);
        if (urun is null)
            throw new KeyNotFoundException($"Ürün '{request.Id}' bulunamadı.");

        await repository.DeleteAsync(urun, cancellationToken);
    }
}
