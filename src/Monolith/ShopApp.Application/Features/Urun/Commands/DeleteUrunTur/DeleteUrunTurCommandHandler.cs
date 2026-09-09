using MediatR;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Domain.Urun.Entities;
using UrunEntity = ShopApp.Domain.Urun.Entities.Urun;

namespace ShopApp.Application.Features.Urun.Commands.DeleteUrunTur;

public sealed class DeleteUrunTurCommandHandler(
    IGenericUrunRepository<UrunTur> urunTurRepository,
    IGenericUrunRepository<UrunEntity> urunRepository)
    : IRequestHandler<DeleteUrunTurCommand>
{
    public async Task Handle(DeleteUrunTurCommand request, CancellationToken cancellationToken)
    {
        var urun = await urunRepository.GetByIdAsync(request.UrunId, cancellationToken);
        if (urun is null)
            throw new KeyNotFoundException($"Ürün '{request.UrunId}' bulunamadı.");

        var urunTur = await urunTurRepository.GetByIdAsync(request.Id, cancellationToken);
        if (urunTur is null || urunTur.UrunId != request.UrunId)
            throw new KeyNotFoundException($"Ürün türü '{request.Id}' bulunamadı.");

        await urunTurRepository.DeleteAsync(urunTur, cancellationToken);
    }
}
