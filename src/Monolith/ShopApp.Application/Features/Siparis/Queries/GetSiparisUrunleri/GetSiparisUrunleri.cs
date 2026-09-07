using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Application.Features.Siparis.Dtos;

namespace ShopApp.Application.Features.Siparis.Queries;

public class GetSiparisUrunleri
{
    public sealed record GetSiparisUrunleriQuery(Guid SiparisId) : IRequest<List<ResultSiparisUrunleriDto>>;

    public sealed class GetSiparisUrunleriQueryHandler(
        IShopAppDbContext context,
        ICurrentCustomerContext currentCustomerContext,
        IMapper mapper) : IRequestHandler<GetSiparisUrunleriQuery, List<ResultSiparisUrunleriDto>>
    {
        public async Task<List<ResultSiparisUrunleriDto>> Handle(GetSiparisUrunleriQuery request, CancellationToken cancellationToken)
        {
            var customer = await currentCustomerContext.GetRequiredAsync(cancellationToken);

            var siparisExists = await context.Siparisler
                .AsNoTracking()
                .AnyAsync(s => s.Id == request.SiparisId && s.MusteriId == customer.MusteriId, cancellationToken);
            if (!siparisExists)
                throw new KeyNotFoundException($"Sipariş '{request.SiparisId}' bulunamadı.");

            var urunler = await context.SiparisUrunleri
                .AsNoTracking()
                .Where(x => x.SiparisId == request.SiparisId)
                .ToListAsync(cancellationToken);

            return mapper.Map<List<ResultSiparisUrunleriDto>>(urunler);
        }
    }
}
