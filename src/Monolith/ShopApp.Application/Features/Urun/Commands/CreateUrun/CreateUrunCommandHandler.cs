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

        await urunRepository.AddAsync(urun, cancellationToken);
        return urun.Id;
    }
}
