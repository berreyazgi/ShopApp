using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Application.Features.Urun.Dtos;

namespace ShopApp.Application.Features.Urun.Queries;

public class GetUrunGorsel
{
    public sealed record GetUrunGorselQuery(Guid UrunId, Guid Id) : IRequest<GetByIdUrunGorselDto>;

    public sealed class GetUrunGorselQueryHandler(
        IShopAppDbContext context,
        IMapper mapper) : IRequestHandler<GetUrunGorselQuery, GetByIdUrunGorselDto>
    {
        public async Task<GetByIdUrunGorselDto> Handle(GetUrunGorselQuery request, CancellationToken cancellationToken)
        {
            var gorsel = await context.UrunGorsel
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == request.Id && x.UrunId == request.UrunId, cancellationToken)
                ?? throw new KeyNotFoundException($"Ürün görseli '{request.Id}' bulunamadı.");

            return mapper.Map<GetByIdUrunGorselDto>(gorsel);
        }
    }
}
