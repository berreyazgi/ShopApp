using MediatR;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Domain.Urun.Entities;
using UrunEntity = ShopApp.Domain.Urun.Entities.Urun;

namespace ShopApp.Application.Features.Urun.Commands.CreateUrunGorsel;

public sealed class CreateUrunGorselCommandHandler(
    IGenericUrunRepository<UrunGorsel> gorselRepository,
    IGenericUrunRepository<UrunEntity> urunRepository,
    ICurrentCustomerContext currentCustomerContext)
    : IRequestHandler<CreateUrunGorselCommand, Guid>
{
    public async Task<Guid> Handle(CreateUrunGorselCommand request, CancellationToken cancellationToken)
    {
        var customer = await currentCustomerContext.GetRequiredAsync(cancellationToken);

        var urun = await urunRepository.GetByIdAsync(request.UrunId, cancellationToken);
        if (urun is null)
            throw new KeyNotFoundException($"Ürün '{request.UrunId}' bulunamadı.");

        var gorsel = new UrunGorsel
        {
            UrunId = request.UrunId,
            GorselUrl = request.GorselUrl,
            GorselSira = request.GorselSira,
            OlusturanKullaniciId = customer.KullaniciId
        };

        await gorselRepository.AddAsync(gorsel, cancellationToken);
        return gorsel.Id;
    }
}
