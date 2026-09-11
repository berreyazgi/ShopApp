using MediatR;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Domain.Urun.Entities;
using UrunEntity = ShopApp.Domain.Urun.Entities.Urun;

namespace ShopApp.Application.Features.Urun.Commands.UpdateUrunOzellik;

public sealed class UpdateUrunOzellikCommandHandler(
    IGenericUrunRepository<UrunOzellik> ozellikRepository,
    IGenericUrunRepository<UrunEntity> urunRepository,
    ICurrentCustomerContext currentCustomerContext)
    : IRequestHandler<UpdateUrunOzellikCommand>
{
    public async Task Handle(UpdateUrunOzellikCommand request, CancellationToken cancellationToken)
    {
        var kullaniciId = await currentCustomerContext.GetCurrentKullaniciIdAsync(cancellationToken);

        var urun = await urunRepository.GetByIdAsync(request.UrunId, cancellationToken);
        if (urun is null)
            throw new KeyNotFoundException($"Ürün '{request.UrunId}' bulunamadı.");

        var ozellik = await ozellikRepository.GetByIdAsync(request.Id, cancellationToken);
        if (ozellik is null || ozellik.UrunId != request.UrunId)
            throw new KeyNotFoundException($"Ürün özelliği '{request.Id}' bulunamadı.");

        ozellik.OzellikAd = request.OzellikAd;
        ozellik.Deger = request.Deger;
        ozellik.Siralama = request.Siralama;
        ozellik.GuncelleyenKullaniciId = kullaniciId;
        ozellik.GuncellemeTarihi = DateTime.UtcNow;

        await ozellikRepository.UpdateAsync(ozellik, cancellationToken);
    }
}
