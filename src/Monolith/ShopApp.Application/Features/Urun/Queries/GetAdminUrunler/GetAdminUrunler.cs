using MediatR;
using Microsoft.EntityFrameworkCore;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Application.Features.Urun.Dtos;

namespace ShopApp.Application.Features.Urun.Queries;

public class GetAdminUrunler
{
    /// <summary>
    /// Admin-only product list — always includes active AND passive products
    /// (the admin catalogue must keep a passive product manageable), and
    /// carries each product's real ToplamStok, summed across all of its
    /// persisted UrunTur rows rather than picking an arbitrary variant.
    /// </summary>
    public sealed record GetAdminUrunlerQuery(Guid? KategoriId = null) : IRequest<List<AdminUrunListDto>>;

    public sealed class GetAdminUrunlerQueryHandler(IShopAppDbContext context)
        : IRequestHandler<GetAdminUrunlerQuery, List<AdminUrunListDto>>
    {
        public async Task<List<AdminUrunListDto>> Handle(GetAdminUrunlerQuery request, CancellationToken cancellationToken)
        {
            return await context.Urun
                .AsNoTracking()
                .Where(x => request.KategoriId == null || x.KategoriId == request.KategoriId)
                .Select(x => new AdminUrunListDto(
                    x.Id,
                    x.KategoriId,
                    x.UrunAd,
                    x.Detay,
                    x.Fiyat,
                    x.MarkaAd,
                    x.GecmisFiyat,
                    x.GorselUrl,
                    x.AktifMi,
                    x.UrunTurleri.Sum(t => t.StokAded)))
                .ToListAsync(cancellationToken);
        }
    }
}
