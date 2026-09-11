using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Application.Features.Urun.Dtos;

namespace ShopApp.Application.Features.Urun.Queries;

public class GetUrunOzellik
{
    public sealed record GetUrunOzellikQuery(Guid UrunId, Guid Id) : IRequest<GetByIdUrunOzellikDto>;

    public sealed class GetUrunOzellikQueryHandler(
        IShopAppDbContext context,
        IMapper mapper) : IRequestHandler<GetUrunOzellikQuery, GetByIdUrunOzellikDto>
    {
        public async Task<GetByIdUrunOzellikDto> Handle(GetUrunOzellikQuery request, CancellationToken cancellationToken)
        {
            var ozellik = await context.UrunOzellik
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == request.Id && x.UrunId == request.UrunId, cancellationToken)
                ?? throw new KeyNotFoundException($"Ürün özelliği '{request.Id}' bulunamadı.");

            return mapper.Map<GetByIdUrunOzellikDto>(ozellik);
        }
    }
}
