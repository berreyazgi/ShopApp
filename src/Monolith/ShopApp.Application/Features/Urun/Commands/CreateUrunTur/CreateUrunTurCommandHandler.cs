using MediatR;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Domain.Urun.Entities;
using UrunEntity = ShopApp.Domain.Urun.Entities.Urun;

namespace ShopApp.Application.Features.Urun.Commands.CreateUrunTur;

public sealed class CreateUrunTurCommandHandler(
    IGenericUrunRepository<UrunTur> urunTurRepository,
    IGenericUrunRepository<UrunEntity> urunRepository,
    ICurrentCustomerContext currentCustomerContext)
    : IRequestHandler<CreateUrunTurCommand, Guid>
{
    public async Task<Guid> Handle(CreateUrunTurCommand request, CancellationToken cancellationToken)
    {
        var customer = await currentCustomerContext.GetRequiredAsync(cancellationToken);

        var urun = await urunRepository.GetByIdAsync(request.UrunId, cancellationToken);
        if (urun is null)
            throw new KeyNotFoundException($"Ürün '{request.UrunId}' bulunamadı.");

        var urunTur = new UrunTur
        {
            UrunId = request.UrunId,
            Ad = request.Ad,
            StokAded = request.StokAded,
            StokKod = request.StokKod,
            FiyatFarki = request.FiyatFarki,
            AktifMi = request.AktifMi,
            OlusturanKullaniciId = customer.KullaniciId
        };

        await urunTurRepository.AddAsync(urunTur, cancellationToken);
        return urunTur.Id;
    }
}
