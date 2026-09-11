using MediatR;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Domain.Urun.Entities;
using UrunEntity = ShopApp.Domain.Urun.Entities.Urun;

namespace ShopApp.Application.Features.Urun.Commands.UpdateUrunVaryant;

public sealed class UpdateUrunVaryantCommandHandler(
    IGenericUrunRepository<UrunVaryant> urunVaryantRepository,
    IGenericUrunRepository<UrunEntity> urunRepository,
    ICurrentCustomerContext currentCustomerContext)
    : IRequestHandler<UpdateUrunVaryantCommand>
{
    public async Task Handle(UpdateUrunVaryantCommand request, CancellationToken cancellationToken)
    {
        var customer = await currentCustomerContext.GetRequiredAsync(cancellationToken);

        var urun = await urunRepository.GetByIdAsync(request.UrunId, cancellationToken);
        if (urun is null)
            throw new KeyNotFoundException($"Ürün '{request.UrunId}' bulunamadı.");

        var urunVaryant = await urunVaryantRepository.GetByIdAsync(request.Id, cancellationToken);
        if (urunVaryant is null || urunVaryant.UrunId != request.UrunId)
            throw new KeyNotFoundException($"Ürün varyantı '{request.Id}' bulunamadı.");

        urunVaryant.Beden = request.Beden;
        urunVaryant.Renk = request.Renk;
        urunVaryant.StokAdet = request.StokAdet;
        urunVaryant.StokKod = request.StokKod;
        urunVaryant.FiyatFarki = request.FiyatFarki;
        urunVaryant.AktifMi = request.AktifMi;
        urunVaryant.GuncelleyenKullaniciId = customer.KullaniciId;
        urunVaryant.GuncellemeTarihi = DateTime.UtcNow;

        await urunVaryantRepository.UpdateAsync(urunVaryant, cancellationToken);
    }
}
