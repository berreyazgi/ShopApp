using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ShopApp.Application.Abstractions;
using ShopApp.Application.Dtos.SepetUrunDtos;

namespace ShopApp.Application.SepetUrunleri.Queries;

public class GetSepetUrunu
{
    public sealed record GetSepetUrunuQuery(Guid SepetId, Guid Id) : IRequest<ResultSepetUrunDto>;

    public sealed class GetSepetUrunuQueryHandler(
        IShopAppDbContext context,
        ICurrentCustomerContext currentCustomerContext,
        IMapper mapper) : IRequestHandler<GetSepetUrunuQuery, ResultSepetUrunDto>
    {
        public async Task<ResultSepetUrunDto> Handle(GetSepetUrunuQuery request, CancellationToken cancellationToken)
        {
            var customer = await currentCustomerContext.GetRequiredAsync(cancellationToken);

            var urun = await context.SepetUrunleri
                .AsNoTracking()
                .Where(x => x.Id == request.Id && x.SepetId == request.SepetId && x.SepetEntity.MusteriId == customer.MusteriId)
                .FirstOrDefaultAsync(cancellationToken)
                ?? throw new KeyNotFoundException($"Sepet Ürünü '{request.Id}' bulunamadı.");

            return mapper.Map<ResultSepetUrunDto>(urun);
        }
    }
}
