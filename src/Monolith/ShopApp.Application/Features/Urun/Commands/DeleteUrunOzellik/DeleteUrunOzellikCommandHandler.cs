using MediatR;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Domain.Urun.Entities;

namespace ShopApp.Application.Features.Urun.Commands.DeleteUrunOzellik;

public sealed class DeleteUrunOzellikCommandHandler(
    IGenericUrunRepository<UrunOzellik> ozellikRepository,
    IGenericUrunRepository<UrunTur> urunTurRepository)
    : IRequestHandler<DeleteUrunOzellikCommand>
{
    public async Task Handle(DeleteUrunOzellikCommand request, CancellationToken cancellationToken)
    {
        var urunTur = await urunTurRepository.GetByIdAsync(request.UrunTurId, cancellationToken);
        if (urunTur is null)
            throw new KeyNotFoundException($"Ürün türü '{request.UrunTurId}' bulunamadı.");

        var ozellik = await ozellikRepository.GetByIdAsync(request.Id, cancellationToken);
        if (ozellik is null || ozellik.UrunTurId != request.UrunTurId)
            throw new KeyNotFoundException($"Ürün özelliği '{request.Id}' bulunamadı.");

        await ozellikRepository.DeleteAsync(ozellik, cancellationToken);
    }
}
