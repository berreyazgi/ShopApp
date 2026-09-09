using FluentValidation;
using MediatR;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Domain.Urun.Entities;

namespace ShopApp.Application.Features.Urun.Commands.UpdateKategori;

public sealed class UpdateKategoriCommandHandler(
    IGenericUrunRepository<Kategori> repository,
    ICurrentCustomerContext currentCustomerContext)
    : IRequestHandler<UpdateKategoriCommand>
{
    public async Task Handle(UpdateKategoriCommand request, CancellationToken cancellationToken)
    {
        var customer = await currentCustomerContext.GetRequiredAsync(cancellationToken);

        var kategori = await repository.GetByIdAsync(request.Id, cancellationToken);
        if (kategori is null)
            throw new KeyNotFoundException($"Kategori '{request.Id}' bulunamadı.");

        if (request.UstKategoriId == request.Id)
            throw new ValidationException("Bir kategori kendi üst kategorisi olamaz.");

        if (request.UstKategoriId.HasValue)
        {
            var ustKategori = await repository.GetByIdAsync(request.UstKategoriId.Value, cancellationToken);
            if (ustKategori is null)
                throw new KeyNotFoundException($"Kategori '{request.UstKategoriId}' bulunamadı.");
        }

        kategori.KategoriAd = request.KategoriAd;
        kategori.UstKategoriId = request.UstKategoriId;
        kategori.Detay = request.Detay;
        kategori.GorselUrl = request.GorselUrl;
        kategori.AktifMi = request.AktifMi;
        kategori.GuncelleyenKullaniciId = customer.KullaniciId;
        kategori.GuncellemeTarihi = DateTime.UtcNow;

        await repository.UpdateAsync(kategori, cancellationToken);
    }
}
