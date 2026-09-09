using MediatR;
using Microsoft.EntityFrameworkCore;
using ShopApp.Application.Common.Interfaces;

namespace ShopApp.Application.Features.Sepet.Commands.CreateSepetUrunu;

public sealed class CreateSepetUrunuCommandHandler(
    ISepetRepository sepetRepository,
    IShopAppDbContext context,
    ICurrentCustomerContext currentCustomerContext)
    : IRequestHandler<CreateSepetUrunuCommand, Guid>
{
    public async Task<Guid> Handle(CreateSepetUrunuCommand request, CancellationToken cancellationToken)
    {
        var customer = await currentCustomerContext.GetRequiredAsync(cancellationToken);

        var sepet = await sepetRepository.GetByIdAsync(request.SepetId, cancellationToken);
        if (sepet is null || sepet.MusteriId != customer.MusteriId)
            throw new KeyNotFoundException($"Sepet '{request.SepetId}' bulunamadı.");

        // The variant/product relationship and its price are always resolved
        // server-side — the client only ever supplies UrunTurId + quantity.
        var urunTur = await context.UrunTur
            .Include(t => t.Urun)
            .FirstOrDefaultAsync(t => t.Id == request.UrunTurId, cancellationToken)
            ?? throw new KeyNotFoundException($"Ürün varyantı '{request.UrunTurId}' bulunamadı.");

        if (!urunTur.AktifMi)
            throw new InvalidOperationException("Bu ürün varyantı artık satışta değil.");
        if (!urunTur.Urun.AktifMi)
            throw new InvalidOperationException("Bu ürün artık satışta değil.");

        var existingLine = sepet.Urunler.FirstOrDefault(u => u.UrunTurId == request.UrunTurId);
        var requestedTotal = (existingLine?.UrunMiktar ?? 0) + request.UrunMiktar;

        if (requestedTotal > urunTur.StokAded)
            throw new InvalidOperationException("Seçtiğiniz üründen yeterli stok bulunmuyor.");

        var authoritativePrice = urunTur.Urun.Fiyat + urunTur.FiyatFarki;

        Guid resultId;
        if (existingLine is not null)
        {
            // Same variant already in the cart — merge into one line instead
            // of creating a duplicate row.
            existingLine.MiktarGuncelle(requestedTotal, customer.KullaniciId);
            resultId = existingLine.Id;
        }
        else
        {
            var eklenen = sepet.UrunEkle(request.UrunTurId, request.UrunMiktar, authoritativePrice, customer.KullaniciId);
            resultId = eklenen.Id;
        }

        await sepetRepository.UpdateAsync(sepet, cancellationToken);
        return resultId;
    }
}
