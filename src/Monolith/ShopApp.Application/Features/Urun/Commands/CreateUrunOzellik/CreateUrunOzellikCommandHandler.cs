using MediatR;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Domain.Urun.Entities;

namespace ShopApp.Application.Features.Urun.Commands.CreateUrunOzellik;

public sealed class CreateUrunOzellikCommandHandler(
    IGenericUrunRepository<UrunOzellik> ozellikRepository,
    IGenericUrunRepository<UrunTur> urunTurRepository,
    ICurrentCustomerContext currentCustomerContext)
    : IRequestHandler<CreateUrunOzellikCommand, Guid>
{
    public async Task<Guid> Handle(CreateUrunOzellikCommand request, CancellationToken cancellationToken)
    {
        var customer = await currentCustomerContext.GetRequiredAsync(cancellationToken);

        var urunTur = await urunTurRepository.GetByIdAsync(request.UrunTurId, cancellationToken);
        if (urunTur is null)
            throw new KeyNotFoundException($"Ürün türü '{request.UrunTurId}' bulunamadı.");

        var ozellik = new UrunOzellik(request.OzellikAd, request.OzellikDeger, request.UrunTurId)
        {
            OlusturanKullaniciId = customer.KullaniciId
        };

        await ozellikRepository.AddAsync(ozellik, cancellationToken);
        return ozellik.Id;
    }
}
