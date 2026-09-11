using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Application.Features.Urun.Dtos;

namespace ShopApp.Application.Features.Urun.Queries;

public class GetUrunVaryant
{
    public sealed record GetUrunVaryantQuery(Guid UrunId, Guid Id) : IRequest<ResultUrunVaryantDto>;

    public sealed class GetUrunVaryantQueryHandler(
        IShopAppDbContext context,
        IMapper mapper) : IRequestHandler<GetUrunVaryantQuery, ResultUrunVaryantDto>
    {
        public async Task<ResultUrunVaryantDto> Handle(GetUrunVaryantQuery request, CancellationToken cancellationToken)
        {
            var urunVaryant = await context.UrunVaryant
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == request.Id && x.UrunId == request.UrunId, cancellationToken)
                ?? throw new KeyNotFoundException($"Ürün varyantı '{request.Id}' bulunamadı.");

            return mapper.Map<ResultUrunVaryantDto>(urunVaryant);
        }
    }
}
