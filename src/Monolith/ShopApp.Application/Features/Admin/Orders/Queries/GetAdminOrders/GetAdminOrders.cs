using MediatR;
using Microsoft.EntityFrameworkCore;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Application.Features.Admin.Orders.Dtos;

namespace ShopApp.Application.Features.Admin.Orders.Queries;

public class GetAdminOrders
{
    public sealed record GetAdminOrdersQuery : IRequest<List<AdminOrderDto>>;

    public sealed class GetAdminOrdersQueryHandler(
        IShopAppDbContext context,
        IIdentityService identityService)
        : IRequestHandler<GetAdminOrdersQuery, List<AdminOrderDto>>
    {
        public async Task<List<AdminOrderDto>> Handle(GetAdminOrdersQuery request, CancellationToken cancellationToken)
        {
            var orders = await context.Siparisler.AsNoTracking()
                .Include(s => s.Durum)
                .Include(s => s.Urunler)
                .OrderByDescending(s => s.OlusturmaTarihi)
                .ToListAsync(cancellationToken);

            var musteriIds = orders.Select(o => o.MusteriId).Distinct().ToList();
            var musteriToKullanici = await context.Musteriler.AsNoTracking()
                .Where(m => musteriIds.Contains(m.Id))
                .ToDictionaryAsync(m => m.Id, m => m.KullaniciId, cancellationToken);

            var identityMap = await identityService.FindByIdsAsync(musteriToKullanici.Values, cancellationToken);

            return orders.Select(s =>
            {
                var info = musteriToKullanici.TryGetValue(s.MusteriId, out var kullaniciId)
                    && identityMap.TryGetValue(kullaniciId, out var i) ? i : null;

                return new AdminOrderDto(
                    s.Id,
                    s.SiparisNumarasi,
                    s.MusteriId,
                    info is not null ? $"{info.Ad} {info.Soyad}".Trim() : "Misafir",
                    info?.Email,
                    s.OlusturmaTarihi,
                    s.Urunler.Count,
                    s.ToplamFiyat,
                    s.DurumId,
                    s.Durum != null ? s.Durum.DurumIsmi : s.DurumId.ToString());
            }).ToList();
        }
    }
}
