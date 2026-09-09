using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Application.Features.Urun.Dtos;

namespace ShopApp.Application.Features.Urun.Queries;

public class GetUrunTur
{
    public sealed record GetUrunTurQuery(Guid UrunId, Guid Id) : IRequest<GetByIdUrunTurDto>;

    public sealed class GetUrunTurQueryHandler(
        IShopAppDbContext context,
        IMapper mapper) : IRequestHandler<GetUrunTurQuery, GetByIdUrunTurDto>
    {
        public async Task<GetByIdUrunTurDto> Handle(GetUrunTurQuery request, CancellationToken cancellationToken)
        {
            var urunTur = await context.UrunTur
                .AsNoTracking()
                .Include(x => x.Ozellikler)
                .FirstOrDefaultAsync(x => x.Id == request.Id && x.UrunId == request.UrunId, cancellationToken)
                ?? throw new KeyNotFoundException($"Ürün türü '{request.Id}' bulunamadı.");

            return mapper.Map<GetByIdUrunTurDto>(urunTur);
        }
    }
}
