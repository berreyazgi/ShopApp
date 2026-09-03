using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ShopApp.Application.Abstractions;
using ShopApp.Application.Siparis.Dtos;

namespace ShopApp.Application.Siparis.Queries;

public class GetMySiparisler
{
    public sealed record GetMySiparislerQuery : IRequest<List<ResultSiparisDto>>;

    public sealed class GetMySiparislerQueryHandler(
        IShopAppDbContext context,
        ICurrentCustomerContext currentCustomerContext,
        IMapper mapper) : IRequestHandler<GetMySiparislerQuery, List<ResultSiparisDto>>
    {
        public async Task<List<ResultSiparisDto>> Handle(GetMySiparislerQuery request, CancellationToken cancellationToken)
        {
            var customer = await currentCustomerContext.GetRequiredAsync(cancellationToken);

            var siparisler = await context.Siparisler
                .AsNoTracking()
                .Include(s => s.Durum)
                .Where(s => s.MusteriId == customer.MusteriId)
                .ToListAsync(cancellationToken);

            return mapper.Map<List<ResultSiparisDto>>(siparisler);
        }
    }
}
