using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Application.Features.Sepet.Dtos;

namespace ShopApp.Application.Features.Sepet.Queries;

public class GetMySepetler
{
    public sealed record GetMySepetlerQuery : IRequest<List<ResultSepetDto>>;

    public sealed class GetMySepetlerQueryHandler(
        IShopAppDbContext context,
        ICurrentCustomerContext currentCustomerContext,
        IMapper mapper) : IRequestHandler<GetMySepetlerQuery, List<ResultSepetDto>>
    {
        public async Task<List<ResultSepetDto>> Handle(GetMySepetlerQuery request, CancellationToken cancellationToken)
        {
            var customer = await currentCustomerContext.GetRequiredAsync(cancellationToken);

            var sepetler = await context.Sepetler
                .AsNoTracking()
                .Where(s => s.MusteriId == customer.MusteriId)
                .ToListAsync(cancellationToken);

            return mapper.Map<List<ResultSepetDto>>(sepetler);
        }
    }
}
