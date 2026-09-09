using MediatR;
using Microsoft.EntityFrameworkCore;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Application.Features.Sepet.Dtos;
using ShopApp.Application.Features.Sepet.Queries;

namespace ShopApp.Application.Features.Sepet.Queries;

public class GetSepetUrunu
{
    public sealed record GetSepetUrunuQuery(Guid SepetId, Guid Id) : IRequest<ResultSepetUrunDto>;

    public sealed class GetSepetUrunuQueryHandler(
        IShopAppDbContext context,
        ICurrentCustomerContext currentCustomerContext) : IRequestHandler<GetSepetUrunuQuery, ResultSepetUrunDto>
    {
        public async Task<ResultSepetUrunDto> Handle(GetSepetUrunuQuery request, CancellationToken cancellationToken)
        {
            var customer = await currentCustomerContext.GetRequiredAsync(cancellationToken);

            var urun = await context.SepetUrunleri
                .AsNoTracking()
                .Where(x => x.Id == request.Id && x.SepetId == request.SepetId && x.SepetEntity.MusteriId == customer.MusteriId)
                .FirstOrDefaultAsync(cancellationToken)
                ?? throw new KeyNotFoundException($"Sepet Ürünü '{request.Id}' bulunamadı.");

            var urunTur = await context.UrunTur
                .AsNoTracking()
                .Include(t => t.Urun)
                .Include(t => t.Ozellikler)
                .FirstOrDefaultAsync(t => t.Id == urun.UrunTurId, cancellationToken);

            return GetSepetUrunleri.ToDto(urun, urunTur);
        }
    }
}
