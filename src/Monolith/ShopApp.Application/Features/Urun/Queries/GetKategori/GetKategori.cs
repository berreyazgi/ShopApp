using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Application.Features.Urun.Dtos;

namespace ShopApp.Application.Features.Urun.Queries;

public class GetKategori
{
    public sealed record GetKategoriQuery(Guid Id) : IRequest<GetByIdKategoriDto>;

    public sealed class GetKategoriQueryHandler(
        IShopAppDbContext context,
        IMapper mapper) : IRequestHandler<GetKategoriQuery, GetByIdKategoriDto>
    {
        public async Task<GetByIdKategoriDto> Handle(GetKategoriQuery request, CancellationToken cancellationToken)
        {
            var kategori = await context.Kategori
                .AsNoTracking()
                .Include(x => x.AltKategoriler)
                .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken)
                ?? throw new KeyNotFoundException($"Kategori '{request.Id}' bulunamadı.");

            return mapper.Map<GetByIdKategoriDto>(kategori);
        }
    }
}
