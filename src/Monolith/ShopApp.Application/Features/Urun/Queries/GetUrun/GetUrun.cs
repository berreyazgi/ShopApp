using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Application.Features.Urun.Dtos;

namespace ShopApp.Application.Features.Urun.Queries;

public class GetUrun
{
    public sealed record GetUrunQuery(Guid Id) : IRequest<GetByIdUrunDto>;

    public sealed class GetUrunQueryHandler(
        IShopAppDbContext context,
        IMapper mapper) : IRequestHandler<GetUrunQuery, GetByIdUrunDto>
    {
        public async Task<GetByIdUrunDto> Handle(GetUrunQuery request, CancellationToken cancellationToken)
        {
            var urun = await context.Urun
                .AsNoTracking()
                .Include(x => x.Kategori)
                .Include(x => x.Gorseller)
                .Include(x => x.UrunTurleri)
                .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken)
                ?? throw new KeyNotFoundException($"Ürün '{request.Id}' bulunamadı.");

            return mapper.Map<GetByIdUrunDto>(urun);
        }
    }
}
