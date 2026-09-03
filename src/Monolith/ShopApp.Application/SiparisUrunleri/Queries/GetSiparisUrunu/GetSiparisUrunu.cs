using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ShopApp.Application.Abstractions;
using ShopApp.Application.SiparisUrunleri.Dtos;

namespace ShopApp.Application.SiparisUrunleri.Queries;

public class GetSiparisUrunu
{
    public sealed record GetSiparisUrunuQuery(Guid SiparisId, Guid Id) : IRequest<ResultSiparisUrunleriDto>;

    public sealed class GetSiparisUrunuQueryHandler(
        IShopAppDbContext context,
        ICurrentCustomerContext currentCustomerContext,
        IMapper mapper) : IRequestHandler<GetSiparisUrunuQuery, ResultSiparisUrunleriDto>
    {
        public async Task<ResultSiparisUrunleriDto> Handle(GetSiparisUrunuQuery request, CancellationToken cancellationToken)
        {
            var customer = await currentCustomerContext.GetRequiredAsync(cancellationToken);

            var urun = await context.SiparisUrunleri
                           .AsNoTracking()
                           .Where(x => x.Id == request.Id && x.SiparisId == request.SiparisId && x.SiparisEntity.MusteriId == customer.MusteriId)
                           .FirstOrDefaultAsync(cancellationToken)
                       ?? throw new KeyNotFoundException($"Siparis Ürünü '{request.Id}' bulunamadı.");

            return mapper.Map<ResultSiparisUrunleriDto>(urun);
        }
    }
}