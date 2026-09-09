using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Application.Features.Urun.Dtos;

namespace ShopApp.Application.Features.Urun.Queries;

public class GetKategoriler
{
    public sealed record GetKategorilerQuery : IRequest<List<ResultKategoriDto>>;

    public sealed class GetKategorilerQueryHandler(
        IShopAppDbContext context,
        IMapper mapper) : IRequestHandler<GetKategorilerQuery, List<ResultKategoriDto>>
    {
        public async Task<List<ResultKategoriDto>> Handle(GetKategorilerQuery request, CancellationToken cancellationToken)
        {
            var kategoriler = await context.Kategori
                .AsNoTracking()
                .ToListAsync(cancellationToken);

            return mapper.Map<List<ResultKategoriDto>>(kategoriler);
        }
    }
}
