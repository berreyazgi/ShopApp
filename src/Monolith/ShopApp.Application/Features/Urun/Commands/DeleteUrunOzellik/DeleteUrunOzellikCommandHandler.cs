using MediatR;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Domain.Urun.Entities;
using UrunEntity = ShopApp.Domain.Urun.Entities.Urun;

namespace ShopApp.Application.Features.Urun.Commands.DeleteUrunOzellik;

public sealed class DeleteUrunOzellikCommandHandler(
    IGenericUrunRepository<UrunOzellik> ozellikRepository,
    IGenericUrunRepository<UrunEntity> urunRepository)
    : IRequestHandler<DeleteUrunOzellikCommand>
{
    public async Task Handle(DeleteUrunOzellikCommand request, CancellationToken cancellationToken)
    {
        var urun = await urunRepository.GetByIdAsync(request.UrunId, cancellationToken);
        if (urun is null)
            throw new KeyNotFoundException($"Ürün '{request.UrunId}' bulunamadı.");

        var ozellik = await ozellikRepository.GetByIdAsync(request.Id, cancellationToken);
        if (ozellik is null || ozellik.UrunId != request.UrunId)
            throw new KeyNotFoundException($"Ürün özelliği '{request.Id}' bulunamadı.");

        await ozellikRepository.DeleteAsync(ozellik, cancellationToken);
    }
}
