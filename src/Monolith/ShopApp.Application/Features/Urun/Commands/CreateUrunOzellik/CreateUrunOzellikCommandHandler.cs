using MediatR;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Domain.Urun.Entities;
using UrunEntity = ShopApp.Domain.Urun.Entities.Urun;

namespace ShopApp.Application.Features.Urun.Commands.CreateUrunOzellik;

public sealed class CreateUrunOzellikCommandHandler(
    IGenericUrunRepository<UrunOzellik> ozellikRepository,
    IGenericUrunRepository<UrunEntity> urunRepository,
    ICurrentCustomerContext currentCustomerContext)
    : IRequestHandler<CreateUrunOzellikCommand, Guid>
{
    public async Task<Guid> Handle(CreateUrunOzellikCommand request, CancellationToken cancellationToken)
    {
        var kullaniciId = await currentCustomerContext.GetCurrentKullaniciIdAsync(cancellationToken);

        var urun = await urunRepository.GetByIdAsync(request.UrunId, cancellationToken);
        if (urun is null)
            throw new KeyNotFoundException($"Ürün '{request.UrunId}' bulunamadı.");

        var ozellik = new UrunOzellik(request.UrunId, request.OzellikAd, request.Deger, request.Siralama)
        {
            OlusturanKullaniciId = kullaniciId
        };

        await ozellikRepository.AddAsync(ozellik, cancellationToken);
        return ozellik.Id;
    }
}
