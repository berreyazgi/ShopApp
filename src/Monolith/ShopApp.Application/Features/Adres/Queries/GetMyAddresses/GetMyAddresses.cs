using MediatR;
using Microsoft.EntityFrameworkCore;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Application.Features.Adres.Dtos;
using src.Monolith.ShopApp.Domain.Kullanici;

namespace ShopApp.Application.Features.Adres.Queries.GetMyAddresses;

public class GetMyAddresses
{
    public sealed record GetMyAddressesQuery : IRequest<List<AddressDto>>;

    public sealed class GetMyAddressesQueryHandler(
        IShopAppDbContext context,
        ICurrentCustomerContext currentCustomerContext) : IRequestHandler<GetMyAddressesQuery, List<AddressDto>>
    {
        public async Task<List<AddressDto>> Handle(GetMyAddressesQuery request, CancellationToken cancellationToken)
        {
            var customer = await currentCustomerContext.GetRequiredAsync(cancellationToken);

            return await context.Adresler
                .AsNoTracking()
                .Where(a => a.MusteriId == customer.MusteriId)
                .OrderByDescending(a => a.OlusturmaTarihi)
                .Select(a => new AddressDto(
                    a.Id,
                    a.MusteriId,
                    a.AdresBilgisi,
                    a.Ulke,
                    a.Sehir,
                    a.Ilce,
                    a.Mahalle,
                    a.PostaKodu,
                    a.OlusturmaTarihi,
                    a.GuncellemeTarihi))
                .ToListAsync(cancellationToken);
        }
    }
}
