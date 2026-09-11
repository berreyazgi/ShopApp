using MediatR;
using Microsoft.EntityFrameworkCore;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Application.Features.Admin.Dashboard.Dtos;
using ShopApp.Application.Features.Admin.Orders.Queries;
using src.Monolith.ShopApp.Domain.Siparis.Enums;

namespace ShopApp.Application.Features.Admin.Dashboard.Queries;

public class GetAdminDashboard
{
    public sealed record GetAdminDashboardQuery : IRequest<AdminDashboardDto>;

    public sealed class GetAdminDashboardQueryHandler(
        IShopAppDbContext context,
        IMediator mediator) : IRequestHandler<GetAdminDashboardQuery, AdminDashboardDto>
    {
        // Reuses the existing frontend threshold convention (0 = Tükendi,
        // 1..5 = Düşük Stok, >5 = Stokta) — a variant at or below this counts
        // as a stock warning. Only active variants are considered: a passive/
        // discontinued variant sitting at 0 needs no admin attention.
        private const int LowStockThreshold = 5;
        private const int RecentOrdersLimit = 5;
        private const int LowStockListLimit = 10;

        public async Task<AdminDashboardDto> Handle(GetAdminDashboardQuery request, CancellationToken cancellationToken)
        {
            var totalProducts = await context.Urun.AsNoTracking().CountAsync(cancellationToken);
            var totalCategories = await context.Kategori.AsNoTracking().CountAsync(cancellationToken);

            var pendingOrders = await context.Siparisler.AsNoTracking()
                .CountAsync(s => s.DurumId == (int)SiparisDurum.BekleyenOdeme, cancellationToken);

            var lowStockCount = await context.UrunVaryant.AsNoTracking()
                .CountAsync(t => t.AktifMi && t.StokAdet <= LowStockThreshold, cancellationToken);

            var lowStockProducts = await context.UrunVaryant.AsNoTracking()
                .Where(t => t.AktifMi && t.StokAdet <= LowStockThreshold)
                .OrderBy(t => t.StokAdet)
                .Take(LowStockListLimit)
                .Select(t => new AdminLowStockItemDto(t.UrunId, t.Id, t.Urun.UrunAd, t.Renk ?? t.Beden ?? t.StokKod, t.StokAdet))
                .ToListAsync(cancellationToken);

            // Reuses GetAdminOrders rather than duplicating its Musteri/Identity
            // customer-resolution logic for the dashboard's "recent orders" list.
            var allOrders = await mediator.Send(new GetAdminOrders.GetAdminOrdersQuery(), cancellationToken);
            var recentOrders = allOrders
                .OrderByDescending(o => o.CreatedAt)
                .Take(RecentOrdersLimit)
                .Select(o => new AdminDashboardOrderDto(o.Id, o.OrderNumber, o.CustomerName, o.Total, o.Durum, o.CreatedAt))
                .ToList();

            return new AdminDashboardDto(totalProducts, totalCategories, pendingOrders, lowStockCount, recentOrders, lowStockProducts);
        }
    }
}
