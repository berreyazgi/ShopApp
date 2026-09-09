using MediatR;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Domain.Urun.Entities;
using UrunEntity = ShopApp.Domain.Urun.Entities.Urun;

namespace ShopApp.Application.Features.Urun.Commands.UpdateUrun;

public sealed class UpdateUrunCommandHandler(
    IGenericUrunRepository<UrunEntity> urunRepository,
    IGenericUrunRepository<Kategori> kategoriRepository,
    ICurrentCustomerContext currentCustomerContext)
    : IRequestHandler<UpdateUrunCommand>
{
    public async Task Handle(UpdateUrunCommand request, CancellationToken cancellationToken)
    {
        var customer = await currentCustomerContext.GetRequiredAsync(cancellationToken);

        var urun = await urunRepository.GetByIdAsync(request.Id, cancellationToken);
        if (urun is null)
            throw new KeyNotFoundException($"Ürün '{request.Id}' bulunamadı.");

        var kategori = await kategoriRepository.GetByIdAsync(request.KategoriId, cancellationToken);
        if (kategori is null)
            throw new KeyNotFoundException($"Kategori '{request.KategoriId}' bulunamadı.");

        urun.KategoriId = request.KategoriId;
        urun.UrunAd = request.UrunAd;
        urun.Detay = request.Detay;
        urun.Fiyat = request.Fiyat;
        urun.MarkaAd = request.MarkaAd;
        urun.GecmisFiyat = request.GecmisFiyat;
        urun.GorselUrl = request.GorselUrl;
        urun.AktifMi = request.AktifMi;
        urun.GuncelleyenKullaniciId = customer.KullaniciId;
        urun.GuncellemeTarihi = DateTime.UtcNow;

        await urunRepository.UpdateAsync(urun, cancellationToken);
    }
}
