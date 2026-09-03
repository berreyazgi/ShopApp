using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ShopApp.Application.Abstractions;
using ShopApp.Application.Dtos.SepetUrunDtos;

namespace ShopApp.Application.SepetUrunleri.Queries;

public class GetSepetUrunleri
{
    public sealed record GetSepetUrunleriQuery(Guid SepetId) : IRequest<List<ResultSepetUrunDto>>;

    public sealed class GetSepetUrunleriQueryHandler(
        IShopAppDbContext context,
        ICurrentCustomerContext currentCustomerContext,
        IMapper mapper) : IRequestHandler<GetSepetUrunleriQuery, List<ResultSepetUrunDto>>
    {
        public async Task<List<ResultSepetUrunDto>> Handle(GetSepetUrunleriQuery request, CancellationToken cancellationToken)
        {
            var customer = await currentCustomerContext.GetRequiredAsync(cancellationToken);

            var sepetExists = await context.Sepetler
                .AsNoTracking()
                .AnyAsync(s => s.Id == request.SepetId && s.MusteriId == customer.MusteriId, cancellationToken);
            if (!sepetExists)
                throw new KeyNotFoundException($"Sepet '{request.SepetId}' bulunamadı.");

            var urunler = await context.SepetUrunleri
                .AsNoTracking()
                .Where(x => x.SepetId == request.SepetId)
                .ToListAsync(cancellationToken);

            return mapper.Map<List<ResultSepetUrunDto>>(urunler);
        }
    }
}
