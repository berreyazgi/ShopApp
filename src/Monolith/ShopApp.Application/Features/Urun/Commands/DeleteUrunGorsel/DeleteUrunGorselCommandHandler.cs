using MediatR;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Domain.Urun.Entities;
using UrunEntity = ShopApp.Domain.Urun.Entities.Urun;

namespace ShopApp.Application.Features.Urun.Commands.DeleteUrunGorsel;

public sealed class DeleteUrunGorselCommandHandler(
    IGenericUrunRepository<UrunGorsel> gorselRepository,
    IGenericUrunRepository<UrunEntity> urunRepository)
    : IRequestHandler<DeleteUrunGorselCommand>
{
    public async Task Handle(DeleteUrunGorselCommand request, CancellationToken cancellationToken)
    {
        var urun = await urunRepository.GetByIdAsync(request.UrunId, cancellationToken);
        if (urun is null)
            throw new KeyNotFoundException($"Ürün '{request.UrunId}' bulunamadı.");

        var gorsel = await gorselRepository.GetByIdAsync(request.Id, cancellationToken);
        if (gorsel is null || gorsel.UrunId != request.UrunId)
            throw new KeyNotFoundException($"Ürün görseli '{request.Id}' bulunamadı.");

        await gorselRepository.DeleteAsync(gorsel, cancellationToken);
    }
}
