using MediatR;
using Microsoft.EntityFrameworkCore;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Application.Features.Adres.Dtos;

namespace ShopApp.Application.Features.Adres.Queries.GetMyAddress;

public class GetMyAddress
{
    public sealed record GetMyAddressQuery(Guid Id) : IRequest<AddressDto>;

    public sealed class GetMyAddressQueryHandler(
        IShopAppDbContext context,
        ICurrentCustomerContext currentCustomerContext) : IRequestHandler<GetMyAddressQuery, AddressDto>
    {
        public async Task<AddressDto> Handle(GetMyAddressQuery request, CancellationToken cancellationToken)
        {
            var customer = await currentCustomerContext.GetRequiredAsync(cancellationToken);

            return await context.Adresler
                .AsNoTracking()
                .Where(address => address.Id == request.Id && address.MusteriId == customer.MusteriId)
                .Select(address => new AddressDto(
                    address.Id,
                    address.MusteriId,
                    address.AdresBilgisi,
                    address.Telefon,
                    address.Ulke,
                    address.Sehir,
                    address.Ilce,
                    address.Mahalle,
                    address.PostaKodu,
                    address.OlusturmaTarihi,
                    address.GuncellemeTarihi))
                .FirstOrDefaultAsync(cancellationToken)
                ?? throw new KeyNotFoundException("Adres bulunamadı veya bu kullanıcıya ait değil.");
        }
    }
}
