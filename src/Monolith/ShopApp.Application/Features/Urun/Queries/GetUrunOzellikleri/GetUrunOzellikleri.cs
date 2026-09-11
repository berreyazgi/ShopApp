using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Application.Features.Urun.Dtos;

namespace ShopApp.Application.Features.Urun.Queries;

public class GetUrunOzellikleri
{
    public sealed record GetUrunOzellikleriQuery(Guid UrunId) : IRequest<List<ResultUrunOzellikDto>>;

    public sealed class GetUrunOzellikleriQueryHandler(
        IShopAppDbContext context,
        IMapper mapper) : IRequestHandler<GetUrunOzellikleriQuery, List<ResultUrunOzellikDto>>
    {
        public async Task<List<ResultUrunOzellikDto>> Handle(GetUrunOzellikleriQuery request, CancellationToken cancellationToken)
        {
            var urunExists = await context.Urun
                .AsNoTracking()
                .AnyAsync(x => x.Id == request.UrunId, cancellationToken);
            if (!urunExists)
                throw new KeyNotFoundException($"Ürün '{request.UrunId}' bulunamadı.");

            var ozellikler = await context.UrunOzellik
                .AsNoTracking()
                .Where(x => x.UrunId == request.UrunId)
                .OrderBy(x => x.Siralama)
                .ToListAsync(cancellationToken);

            return mapper.Map<List<ResultUrunOzellikDto>>(ozellikler);
        }
    }
}
