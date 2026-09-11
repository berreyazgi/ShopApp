using MediatR;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Domain.Urun.Entities;
using UrunEntity = ShopApp.Domain.Urun.Entities.Urun;

namespace ShopApp.Application.Features.Urun.Commands.DeleteUrunVaryant;

public sealed class DeleteUrunVaryantCommandHandler(
    IGenericUrunRepository<UrunVaryant> urunVaryantRepository,
    IGenericUrunRepository<UrunEntity> urunRepository)
    : IRequestHandler<DeleteUrunVaryantCommand>
{
    public async Task Handle(DeleteUrunVaryantCommand request, CancellationToken cancellationToken)
    {
        var urun = await urunRepository.GetByIdAsync(request.UrunId, cancellationToken);
        if (urun is null)
            throw new KeyNotFoundException($"Ürün '{request.UrunId}' bulunamadı.");

        var urunVaryant = await urunVaryantRepository.GetByIdAsync(request.Id, cancellationToken);
        if (urunVaryant is null || urunVaryant.UrunId != request.UrunId)
            throw new KeyNotFoundException($"Ürün varyantı '{request.Id}' bulunamadı.");

        await urunVaryantRepository.DeleteAsync(urunVaryant, cancellationToken);
    }
}
