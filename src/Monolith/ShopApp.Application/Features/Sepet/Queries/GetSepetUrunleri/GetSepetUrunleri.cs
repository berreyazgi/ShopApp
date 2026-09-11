using MediatR;
using Microsoft.EntityFrameworkCore;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Application.Features.Sepet.Dtos;
using ShopApp.Application.Features.Urun.Dtos;

namespace ShopApp.Application.Features.Sepet.Queries;

public class GetSepetUrunleri
{
    public sealed record GetSepetUrunleriQuery(Guid SepetId) : IRequest<List<ResultSepetUrunDto>>;

    public sealed class GetSepetUrunleriQueryHandler(
        IShopAppDbContext context,
        ICurrentCustomerContext currentCustomerContext) : IRequestHandler<GetSepetUrunleriQuery, List<ResultSepetUrunDto>>
    {
        public async Task<List<ResultSepetUrunDto>> Handle(GetSepetUrunleriQuery request, CancellationToken cancellationToken)
        {
            var customer = await currentCustomerContext.GetRequiredAsync(cancellationToken);

            var sepetExists = await context.Sepetler
                .AsNoTracking()
                .AnyAsync(s => s.Id == request.SepetId && s.MusteriId == customer.MusteriId, cancellationToken);
            if (!sepetExists)
                throw new KeyNotFoundException($"Sepet '{request.SepetId}' bulunamadı.");

            var urunler = await context.SepetUrunleri
                .AsNoTracking()
                .Where(x => x.SepetId == request.SepetId)
                .ToListAsync(cancellationToken);

            if (urunler.Count == 0)
                return [];

            var urunVaryantIds = urunler.Select(u => u.UrunVaryantId).Distinct().ToList();
            var urunVaryantler = await context.UrunVaryant
                .AsNoTracking()
                .Include(t => t.Urun).ThenInclude(u => u.Ozellikler)

                .Where(t => urunVaryantIds.Contains(t.Id))
                .ToDictionaryAsync(t => t.Id, cancellationToken);

            return urunler.Select(u => ToDto(u, urunVaryantler.GetValueOrDefault(u.UrunVaryantId))).ToList();
        }
    }

    internal static ResultSepetUrunDto ToDto(src.Monolith.ShopApp.Domain.Sepet.Entities.SepetUrunu sepetUrunu, ShopApp.Domain.Urun.Entities.UrunVaryant? urunVaryant) =>
        new(
            sepetUrunu.Id,
            sepetUrunu.SepetId,
            sepetUrunu.UrunVaryantId,
            urunVaryant?.UrunId ?? Guid.Empty,
            urunVaryant?.Urun.UrunAd ?? "Ürün bulunamadı",
            urunVaryant?.Urun.GorselUrl,
            urunVaryant?.Urun.Ozellikler.Select(o => new ResultUrunOzellikDto(o.Id, o.UrunId, o.OzellikAd, o.Deger, o.Siralama)).ToList() ?? [],
            sepetUrunu.UrunMiktar,
            sepetUrunu.FiyatGecmis);
}
