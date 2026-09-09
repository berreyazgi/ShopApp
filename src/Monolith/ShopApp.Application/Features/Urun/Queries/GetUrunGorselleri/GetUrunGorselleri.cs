using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Application.Features.Urun.Dtos;

namespace ShopApp.Application.Features.Urun.Queries;

public class GetUrunGorselleri
{
    public sealed record GetUrunGorselleriQuery(Guid UrunId) : IRequest<List<ResultUrunGorselDto>>;

    public sealed class GetUrunGorselleriQueryHandler(
        IShopAppDbContext context,
        IMapper mapper) : IRequestHandler<GetUrunGorselleriQuery, List<ResultUrunGorselDto>>
    {
        public async Task<List<ResultUrunGorselDto>> Handle(GetUrunGorselleriQuery request, CancellationToken cancellationToken)
        {
            var urunExists = await context.Urun
                .AsNoTracking()
                .AnyAsync(x => x.Id == request.UrunId, cancellationToken);
            if (!urunExists)
                throw new KeyNotFoundException($"Ürün '{request.UrunId}' bulunamadı.");

            var gorseller = await context.UrunGorsel
                .AsNoTracking()
                .Where(x => x.UrunId == request.UrunId)
                .OrderBy(x => x.GorselSira)
                .ToListAsync(cancellationToken);

            return mapper.Map<List<ResultUrunGorselDto>>(gorseller);
        }
    }
}
