using MediatR;
using Microsoft.EntityFrameworkCore;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Application.Features.Admin.Orders.Dtos;

namespace ShopApp.Application.Features.Admin.Orders.Queries;

public class GetAdminOrder
{
    /// <summary>
    /// Admin-only order detail — authorized by role (via the controller), not
    /// order ownership. Never reuse a customer-scoped query for this: those
    /// require the requester to own the order, which an Admin never does.
    /// </summary>
    public sealed record GetAdminOrderQuery(Guid Id) : IRequest<AdminOrderDetailDto>;

    public sealed class GetAdminOrderQueryHandler(
        IShopAppDbContext context,
        IIdentityService identityService,
        IKargoReadService kargoReadService)
        : IRequestHandler<GetAdminOrderQuery, AdminOrderDetailDto>
    {
        public async Task<AdminOrderDetailDto> Handle(GetAdminOrderQuery request, CancellationToken cancellationToken)
        {
            var order = await context.Siparisler.AsNoTracking()
                .Include(s => s.Durum)
                .Include(s => s.Urunler)
                .FirstOrDefaultAsync(s => s.Id == request.Id, cancellationToken)
                ?? throw new KeyNotFoundException($"Sipariş '{request.Id}' bulunamadı.");

            // Siparis.MusteriId -> Musteri -> Musteri.KullaniciId -> Identity user.
            // Never infer the customer from audit fields (OlusturanKullaniciId).
            var musteri = await context.Musteriler.AsNoTracking()
                .FirstOrDefaultAsync(m => m.Id == order.MusteriId, cancellationToken);

            var identityInfo = musteri is not null
                ? await identityService.FindByIdAsync(musteri.KullaniciId)
                : null;

            var customer = new AdminOrderCustomerDto(
                order.MusteriId,
                musteri?.KullaniciId ?? Guid.Empty,
                identityInfo is not null ? $"{identityInfo.Ad} {identityInfo.Soyad}".Trim() : "Misafir",
                identityInfo?.Email ?? "",
                identityInfo?.Telefon);

            var items = order.Urunler.Select(u => new AdminOrderItemDto(
                u.Id,
                u.UrunId,
                u.UrunVaryantId,
                u.UrunIsmi,
                u.UrunAciklamasi,
                u.StokTakipNumarasi,
                u.UrunMiktar,
                u.UrunBirimFiyat,
                u.IndirimOrani,
                u.ToplamFiyat)).ToList();

            // An order can exist before a shipment has been created — this is
            // the normal, optional case, never a fake "in transit" default.
            var shipment = await kargoReadService.GetBySiparisIdAsync(order.Id, cancellationToken);

            return new AdminOrderDetailDto(
                order.Id,
                order.SiparisNumarasi,
                order.OlusturmaTarihi,
                customer,
                items,
                order.AraToplam,
                order.IndirimTutari,
                order.KargoFiyat,
                order.ToplamFiyat,
                order.DurumId,
                order.Durum != null ? order.Durum.DurumIsmi : order.DurumId.ToString(),
                shipment);
        }
    }
}
