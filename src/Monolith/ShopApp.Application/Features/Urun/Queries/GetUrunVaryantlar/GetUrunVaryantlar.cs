using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Application.Features.Urun.Dtos;

namespace ShopApp.Application.Features.Urun.Queries;

public class GetUrunVaryantlar
{
    public sealed record GetUrunVaryantlarQuery(Guid UrunId) : IRequest<List<ResultUrunVaryantDto>>;

    public sealed class GetUrunVaryantlarQueryHandler(
        IShopAppDbContext context,
        IMapper mapper) : IRequestHandler<GetUrunVaryantlarQuery, List<ResultUrunVaryantDto>>
    {
        public async Task<List<ResultUrunVaryantDto>> Handle(GetUrunVaryantlarQuery request, CancellationToken cancellationToken)
        {
            var urunExists = await context.Urun
                .AsNoTracking()
                .AnyAsync(x => x.Id == request.UrunId, cancellationToken);
            if (!urunExists)
                throw new KeyNotFoundException($"Ürün '{request.UrunId}' bulunamadı.");

            var varyantlar = await context.UrunVaryant
                .AsNoTracking()
                .Where(x => x.UrunId == request.UrunId && x.AktifMi)
                .ToListAsync(cancellationToken);

            return mapper.Map<List<ResultUrunVaryantDto>>(varyantlar);
        }
    }
}
