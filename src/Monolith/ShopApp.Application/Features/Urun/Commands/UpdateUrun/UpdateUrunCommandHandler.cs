using MediatR;
using Microsoft.EntityFrameworkCore;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Domain.Urun.Entities;
using UrunEntity = ShopApp.Domain.Urun.Entities.Urun;

namespace ShopApp.Application.Features.Urun.Commands.UpdateUrun;

public sealed class UpdateUrunCommandHandler(
    IGenericUrunRepository<UrunEntity> urunRepository,
    IGenericUrunRepository<Kategori> kategoriRepository,
    ICurrentCustomerContext currentCustomerContext,
    IShopAppDbContext? dbContext = null)
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

        if (request.ImageUrls is not null)
        {
            var requestedUrls = request.ImageUrls
                .Where(url => !string.IsNullOrWhiteSpace(url))
                .Distinct()
                .ToList();

            if (dbContext is not null)
            {
                var existingImages = await dbContext.UrunGorsel
                    .Where(x => x.UrunId == urun.Id)
                    .ToListAsync(cancellationToken);

                // Remove images not in requestedUrls
                var toRemove = existingImages.Where(g => !requestedUrls.Contains(g.GorselUrl)).ToList();
                foreach (var rem in toRemove)
                {
                    dbContext.UrunGorsel.Remove(rem);
                    existingImages.Remove(rem);
                }

                // Update or add images with updated order and isMain
                for (int i = 0; i < requestedUrls.Count; i++)
                {
                    var url = requestedUrls[i];
                    var existing = existingImages.FirstOrDefault(g => g.GorselUrl == url);
                    if (existing is not null)
                    {
                        existing.GorselSira = i;
                        existing.AnaGorselMi = (i == 0);
                        existing.GuncelleyenKullaniciId = customer.KullaniciId;
                        existing.GuncellemeTarihi = DateTime.UtcNow;
                    }
                    else
                    {
                        dbContext.UrunGorsel.Add(new UrunGorsel
                        {
                            UrunId = urun.Id,
                            GorselUrl = url,
                            GorselSira = i,
                            AnaGorselMi = (i == 0),
                            OlusturanKullaniciId = customer.KullaniciId
                        });
                    }
                }
            }

            if (string.IsNullOrWhiteSpace(urun.GorselUrl) && requestedUrls.Count > 0)
            {
                urun.GorselUrl = requestedUrls[0];
            }
        }

        await urunRepository.UpdateAsync(urun, cancellationToken);
    }
}
