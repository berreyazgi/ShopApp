using MediatR;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Domain.Urun.Entities;
using UrunEntity = ShopApp.Domain.Urun.Entities.Urun;

namespace ShopApp.Application.Features.Urun.Commands.CreateUrun;

public sealed class CreateUrunCommandHandler(
    IGenericUrunRepository<UrunEntity> urunRepository,
    IGenericUrunRepository<Kategori> kategoriRepository,
    ICurrentCustomerContext currentCustomerContext)
    : IRequestHandler<CreateUrunCommand, Guid>
{
    public async Task<Guid> Handle(CreateUrunCommand request, CancellationToken cancellationToken)
    {
        var customer = await currentCustomerContext.GetRequiredAsync(cancellationToken);

        var kategori = await kategoriRepository.GetByIdAsync(request.KategoriId, cancellationToken);
        if (kategori is null)
            throw new KeyNotFoundException($"Kategori '{request.KategoriId}' bulunamadı.");

        var urun = new UrunEntity
        {
            KategoriId = request.KategoriId,
            UrunAd = request.UrunAd,
            Detay = request.Detay,
            Fiyat = request.Fiyat,
            MarkaAd = request.MarkaAd,
            GecmisFiyat = request.GecmisFiyat,
            GorselUrl = request.GorselUrl,
            AktifMi = request.AktifMi,
            OlusturanKullaniciId = customer.KullaniciId
        };

        var images = (request.ImageUrls ?? [])
            .Where(url => !string.IsNullOrWhiteSpace(url))
            .Distinct()
            .Select((url, index) => new UrunGorsel
            {
                UrunId = urun.Id,
                GorselUrl = url.Trim(),
                GorselSira = index,
                AnaGorselMi = index == 0,
                OlusturanKullaniciId = customer.KullaniciId
            })
            .ToList();

        if (images.Count > 0)
        {
            urun.Gorseller = images;
            if (string.IsNullOrWhiteSpace(urun.GorselUrl))
            {
                urun.GorselUrl = images[0].GorselUrl;
            }
        }
        else if (!string.IsNullOrWhiteSpace(urun.GorselUrl))
        {
            urun.Gorseller = [new UrunGorsel
            {
                UrunId = urun.Id,
                GorselUrl = urun.GorselUrl.Trim(),
                GorselSira = 0,
                AnaGorselMi = true,
                OlusturanKullaniciId = customer.KullaniciId
            }];
        }

        await urunRepository.AddAsync(urun, cancellationToken);
        return urun.Id;
    }
}
