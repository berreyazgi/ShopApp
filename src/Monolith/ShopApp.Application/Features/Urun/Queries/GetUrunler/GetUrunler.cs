using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Application.Features.Urun.Dtos;

namespace ShopApp.Application.Features.Urun.Queries;

public class GetUrunler
{
    public sealed record GetUrunlerQuery(Guid? KategoriId = null) : IRequest<List<ResultUrunDto>>;

    public sealed class GetUrunlerQueryHandler(
        IShopAppDbContext context,
        IMapper mapper) : IRequestHandler<GetUrunlerQuery, List<ResultUrunDto>>
    {
        public async Task<List<ResultUrunDto>> Handle(GetUrunlerQuery request, CancellationToken cancellationToken)
        {
            var urunler = await context.Urun
                .AsNoTracking()
                .Where(x => request.KategoriId == null || x.KategoriId == request.KategoriId)
                .ToListAsync(cancellationToken);

            return mapper.Map<List<ResultUrunDto>>(urunler);
        }
    }
}
