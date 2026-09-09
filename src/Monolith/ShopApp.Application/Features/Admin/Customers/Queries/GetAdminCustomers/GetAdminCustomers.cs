using MediatR;
using Microsoft.EntityFrameworkCore;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Application.Features.Admin.Customers.Dtos;

namespace ShopApp.Application.Features.Admin.Customers.Queries;

public class GetAdminCustomers
{
    public sealed record GetAdminCustomersQuery : IRequest<List<AdminCustomerDto>>;

    /// <summary>
    /// Musteriler (the real "customer" domain boundary) is the single source
    /// of truth for who is a customer — Identity users without a Musteri row
    /// (e.g. Admin-only accounts) are never listed here.
    /// </summary>
    public sealed class GetAdminCustomersQueryHandler(
        IShopAppDbContext context,
        IIdentityService identityService)
        : IRequestHandler<GetAdminCustomersQuery, List<AdminCustomerDto>>
    {
        public async Task<List<AdminCustomerDto>> Handle(GetAdminCustomersQuery request, CancellationToken cancellationToken)
        {
            var musteriler = await context.Musteriler.AsNoTracking().ToListAsync(cancellationToken);
            if (musteriler.Count == 0)
                return [];

            var musteriIds = musteriler.Select(m => m.Id).ToList();
            var orderCounts = await context.Siparisler.AsNoTracking()
                .Where(s => musteriIds.Contains(s.MusteriId))
                .GroupBy(s => s.MusteriId)
                .Select(g => new { MusteriId = g.Key, Count = g.Count() })
                .ToDictionaryAsync(x => x.MusteriId, x => x.Count, cancellationToken);

            var identityMap = await identityService.FindByIdsAsync(musteriler.Select(m => m.KullaniciId), cancellationToken);

            return musteriler
                .Where(m => identityMap.ContainsKey(m.KullaniciId))
                .Select(m =>
                {
                    var info = identityMap[m.KullaniciId];
                    return new AdminCustomerDto(
                        m.Id,
                        m.KullaniciId,
                        $"{info.Ad} {info.Soyad}".Trim(),
                        info.Ad,
                        info.Soyad,
                        info.Email,
                        info.Telefon,
                        info.IsActive,
                        m.OlusturmaTarihi,
                        orderCounts.TryGetValue(m.Id, out var count) ? count : 0);
                })
                .OrderByDescending(x => x.CreatedAt)
                .ToList();
        }
    }
}
