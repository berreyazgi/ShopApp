using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Application.Features.Urun.Dtos;

namespace ShopApp.Application.Features.Urun.Queries;

public class GetUrunler
{
    // IncludePassive is set only by admin-facing callers (AdminUrunController) so
    // that passive (AktifMi = false) products remain manageable after being hidden
    // from the public catalogue. Customer-facing callers (UrunController) must
    // always leave it at the default false.
    public sealed record GetUrunlerQuery(Guid? KategoriId = null, bool IncludePassive = false) : IRequest<List<ResultUrunDto>>;

    public sealed class GetUrunlerQueryHandler(
        IShopAppDbContext context,
        IMapper mapper) : IRequestHandler<GetUrunlerQuery, List<ResultUrunDto>>
    {
        public async Task<List<ResultUrunDto>> Handle(GetUrunlerQuery request, CancellationToken cancellationToken)
        {
            var urunler = await context.Urun
                .AsNoTracking()
                .Where(x => (request.IncludePassive || x.AktifMi)
                    && (request.KategoriId == null || x.KategoriId == request.KategoriId))
                .ToListAsync(cancellationToken);

            return mapper.Map<List<ResultUrunDto>>(urunler);
        }
    }
}
