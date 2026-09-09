using MediatR;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Domain.Urun.Entities;
using UrunEntity = ShopApp.Domain.Urun.Entities.Urun;

namespace ShopApp.Application.Features.Urun.Commands.UpdateUrunGorsel;

public sealed class UpdateUrunGorselCommandHandler(
    IGenericUrunRepository<UrunGorsel> gorselRepository,
    IGenericUrunRepository<UrunEntity> urunRepository,
    ICurrentCustomerContext currentCustomerContext)
    : IRequestHandler<UpdateUrunGorselCommand>
{
    public async Task Handle(UpdateUrunGorselCommand request, CancellationToken cancellationToken)
    {
        var customer = await currentCustomerContext.GetRequiredAsync(cancellationToken);

        var urun = await urunRepository.GetByIdAsync(request.UrunId, cancellationToken);
        if (urun is null)
            throw new KeyNotFoundException($"Ürün '{request.UrunId}' bulunamadı.");

        var gorsel = await gorselRepository.GetByIdAsync(request.Id, cancellationToken);
        if (gorsel is null || gorsel.UrunId != request.UrunId)
            throw new KeyNotFoundException($"Ürün görseli '{request.Id}' bulunamadı.");

        gorsel.GorselUrl = request.GorselUrl;
        gorsel.GorselSira = request.GorselSira;
        gorsel.GuncelleyenKullaniciId = customer.KullaniciId;
        gorsel.GuncellemeTarihi = DateTime.UtcNow;

        await gorselRepository.UpdateAsync(gorsel, cancellationToken);
    }
}
