using MediatR;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Domain.Urun.Entities;

namespace ShopApp.Application.Features.Urun.Commands.CreateKategori;

public sealed class CreateKategoriCommandHandler(
    IGenericUrunRepository<Kategori> repository,
    ICurrentCustomerContext currentCustomerContext)
    : IRequestHandler<CreateKategoriCommand, Guid>
{
    public async Task<Guid> Handle(CreateKategoriCommand request, CancellationToken cancellationToken)
    {
        var customer = await currentCustomerContext.GetRequiredAsync(cancellationToken);

        if (request.UstKategoriId.HasValue)
        {
            var ustKategori = await repository.GetByIdAsync(request.UstKategoriId.Value, cancellationToken);
            if (ustKategori is null)
                throw new KeyNotFoundException($"Kategori '{request.UstKategoriId}' bulunamadı.");
        }

        var kategori = new Kategori
        {
            KategoriAd = request.KategoriAd,
            UstKategoriId = request.UstKategoriId,
            Detay = request.Detay,
            GorselUrl = request.GorselUrl,
            AktifMi = request.AktifMi,
            OlusturanKullaniciId = customer.KullaniciId
        };

        await repository.AddAsync(kategori, cancellationToken);
        return kategori.Id;
    }
}
