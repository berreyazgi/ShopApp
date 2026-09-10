using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Application.Features.Urun.Dtos;

namespace ShopApp.Application.Features.Urun.Queries;

public class GetUrun
{
    // IncludePassive is set only by admin-facing callers (AdminUrunController) so
    // an admin can open a passive product's detail (e.g. to reactivate it).
    // Customer-facing callers (UrunController) must always leave it at the
    // default false, so a passive product's direct URL 404s for customers.
    public sealed record GetUrunQuery(Guid Id, bool IncludePassive = false) : IRequest<GetByIdUrunDto>;

    public sealed class GetUrunQueryHandler(
        IShopAppDbContext context,
        IMapper mapper) : IRequestHandler<GetUrunQuery, GetByIdUrunDto>
    {
        public async Task<GetByIdUrunDto> Handle(GetUrunQuery request, CancellationToken cancellationToken)
        {
            var urun = await context.Urun
                .AsNoTracking()
                .Include(x => x.Kategori)
                .Include(x => x.Gorseller)
                .Include(x => x.UrunTurleri).ThenInclude(t => t.Ozellikler)
                .FirstOrDefaultAsync(x => x.Id == request.Id && (request.IncludePassive || x.AktifMi), cancellationToken)
                ?? throw new KeyNotFoundException($"Ürün '{request.Id}' bulunamadı.");

            return mapper.Map<GetByIdUrunDto>(urun);
        }
    }
}
