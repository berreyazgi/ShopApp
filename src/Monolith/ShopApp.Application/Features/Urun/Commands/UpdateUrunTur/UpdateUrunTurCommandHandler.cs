using MediatR;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Domain.Urun.Entities;
using UrunEntity = ShopApp.Domain.Urun.Entities.Urun;

namespace ShopApp.Application.Features.Urun.Commands.UpdateUrunTur;

public sealed class UpdateUrunTurCommandHandler(
    IGenericUrunRepository<UrunTur> urunTurRepository,
    IGenericUrunRepository<UrunEntity> urunRepository,
    ICurrentCustomerContext currentCustomerContext)
    : IRequestHandler<UpdateUrunTurCommand>
{
    public async Task Handle(UpdateUrunTurCommand request, CancellationToken cancellationToken)
    {
        var customer = await currentCustomerContext.GetRequiredAsync(cancellationToken);

        var urun = await urunRepository.GetByIdAsync(request.UrunId, cancellationToken);
        if (urun is null)
            throw new KeyNotFoundException($"Ürün '{request.UrunId}' bulunamadı.");

        var urunTur = await urunTurRepository.GetByIdAsync(request.Id, cancellationToken);
        if (urunTur is null || urunTur.UrunId != request.UrunId)
            throw new KeyNotFoundException($"Ürün türü '{request.Id}' bulunamadı.");

        urunTur.Ad = request.Ad;
        urunTur.StokAded = request.StokAded;
        urunTur.StokKod = request.StokKod;
        urunTur.FiyatFarki = request.FiyatFarki;
        urunTur.AktifMi = request.AktifMi;
        urunTur.GuncelleyenKullaniciId = customer.KullaniciId;
        urunTur.GuncellemeTarihi = DateTime.UtcNow;

        await urunTurRepository.UpdateAsync(urunTur, cancellationToken);
    }
}
