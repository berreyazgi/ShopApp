using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Application.Features.Urun.Dtos;

namespace ShopApp.Application.Features.Urun.Queries;

public class GetUrunOzellikleri
{
    public sealed record GetUrunOzellikleriQuery(Guid UrunTurId) : IRequest<List<ResultUrunOzellikDto>>;

    public sealed class GetUrunOzellikleriQueryHandler(
        IShopAppDbContext context,
        IMapper mapper) : IRequestHandler<GetUrunOzellikleriQuery, List<ResultUrunOzellikDto>>
    {
        public async Task<List<ResultUrunOzellikDto>> Handle(GetUrunOzellikleriQuery request, CancellationToken cancellationToken)
        {
            var urunTurExists = await context.UrunTur
                .AsNoTracking()
                .AnyAsync(x => x.Id == request.UrunTurId, cancellationToken);
            if (!urunTurExists)
                throw new KeyNotFoundException($"Ürün türü '{request.UrunTurId}' bulunamadı.");

            var ozellikler = await context.UrunOzellik
                .AsNoTracking()
                .Where(x => x.UrunTurId == request.UrunTurId)
                .ToListAsync(cancellationToken);

            return mapper.Map<List<ResultUrunOzellikDto>>(ozellikler);
        }
    }
}
