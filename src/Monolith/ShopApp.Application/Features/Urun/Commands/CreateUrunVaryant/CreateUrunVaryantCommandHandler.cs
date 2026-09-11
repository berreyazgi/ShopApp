using MediatR;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Domain.Urun.Entities;
using UrunEntity = ShopApp.Domain.Urun.Entities.Urun;

namespace ShopApp.Application.Features.Urun.Commands.CreateUrunVaryant;

public sealed class CreateUrunVaryantCommandHandler(
    IGenericUrunRepository<UrunVaryant> urunVaryantRepository,
    IGenericUrunRepository<UrunEntity> urunRepository,
    ICurrentCustomerContext currentCustomerContext)
    : IRequestHandler<CreateUrunVaryantCommand, Guid>
{
    public async Task<Guid> Handle(CreateUrunVaryantCommand request, CancellationToken cancellationToken)
    {
        var customer = await currentCustomerContext.GetRequiredAsync(cancellationToken);

        var urun = await urunRepository.GetByIdAsync(request.UrunId, cancellationToken);
        if (urun is null)
            throw new KeyNotFoundException($"Ürün '{request.UrunId}' bulunamadı.");

        var urunVaryant = new UrunVaryant
        {
            UrunId = request.UrunId,
            Beden = request.Beden,
            Renk = request.Renk,
            StokAdet = request.StokAdet,
            StokKod = request.StokKod,
            FiyatFarki = request.FiyatFarki,
            AktifMi = request.AktifMi,
            OlusturanKullaniciId = customer.KullaniciId
        };

        await urunVaryantRepository.AddAsync(urunVaryant, cancellationToken);
        return urunVaryant.Id;
    }
}
