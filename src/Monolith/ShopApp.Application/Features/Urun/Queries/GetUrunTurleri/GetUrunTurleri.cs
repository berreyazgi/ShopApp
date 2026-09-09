using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Application.Features.Urun.Dtos;

namespace ShopApp.Application.Features.Urun.Queries;

public class GetUrunTurleri
{
    public sealed record GetUrunTurleriQuery(Guid UrunId) : IRequest<List<ResultUrunTurDto>>;

    public sealed class GetUrunTurleriQueryHandler(
        IShopAppDbContext context,
        IMapper mapper) : IRequestHandler<GetUrunTurleriQuery, List<ResultUrunTurDto>>
    {
        public async Task<List<ResultUrunTurDto>> Handle(GetUrunTurleriQuery request, CancellationToken cancellationToken)
        {
            var urunExists = await context.Urun
                .AsNoTracking()
                .AnyAsync(x => x.Id == request.UrunId, cancellationToken);
            if (!urunExists)
                throw new KeyNotFoundException($"Ürün '{request.UrunId}' bulunamadı.");

            var urunTurleri = await context.UrunTur
                .AsNoTracking()
                .Where(x => x.UrunId == request.UrunId)
                .ToListAsync(cancellationToken);

            return mapper.Map<List<ResultUrunTurDto>>(urunTurleri);
        }
    }
}
