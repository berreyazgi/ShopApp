using MediatR;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Domain.Urun.Entities;

namespace ShopApp.Application.Features.Urun.Commands.UpdateUrunOzellik;

public sealed class UpdateUrunOzellikCommandHandler(
    IGenericUrunRepository<UrunOzellik> ozellikRepository,
    IGenericUrunRepository<UrunTur> urunTurRepository,
    ICurrentCustomerContext currentCustomerContext)
    : IRequestHandler<UpdateUrunOzellikCommand>
{
    public async Task Handle(UpdateUrunOzellikCommand request, CancellationToken cancellationToken)
    {
        var customer = await currentCustomerContext.GetRequiredAsync(cancellationToken);

        var urunTur = await urunTurRepository.GetByIdAsync(request.UrunTurId, cancellationToken);
        if (urunTur is null)
            throw new KeyNotFoundException($"Ürün türü '{request.UrunTurId}' bulunamadı.");

        var ozellik = await ozellikRepository.GetByIdAsync(request.Id, cancellationToken);
        if (ozellik is null || ozellik.UrunTurId != request.UrunTurId)
            throw new KeyNotFoundException($"Ürün özelliği '{request.Id}' bulunamadı.");

        ozellik.OzellikAd = request.OzellikAd;
        ozellik.OzellikDeger = request.OzellikDeger;
        ozellik.GuncelleyenKullaniciId = customer.KullaniciId;
        ozellik.GuncellemeTarihi = DateTime.UtcNow;

        await ozellikRepository.UpdateAsync(ozellik, cancellationToken);
    }
}
