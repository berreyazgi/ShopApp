using MediatR;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Application.Features.Profil.Dtos;

namespace ShopApp.Application.Features.Profil.Queries.GetMyProfile;

public class GetMyProfile
{
    public sealed record GetMyProfileQuery : IRequest<UserProfileDto>;

    public sealed class GetMyProfileQueryHandler(
        ICurrentCustomerContext currentCustomerContext,
        IIdentityService identityService) : IRequestHandler<GetMyProfileQuery, UserProfileDto>
    {
        public async Task<UserProfileDto> Handle(GetMyProfileQuery request, CancellationToken cancellationToken)
        {
            var customer = await currentCustomerContext.GetRequiredAsync(cancellationToken);
            var user = await identityService.FindByIdAsync(customer.KullaniciId)
                ?? throw new KeyNotFoundException("Kullanıcı bulunamadı.");

            var fullName = $"{user.Ad} {user.Soyad}".Trim();

            return new UserProfileDto(
                Id: user.Id,
                MusteriId: customer.MusteriId,
                FirstName: user.Ad,
                LastName: user.Soyad,
                FullName: fullName,
                Email: user.Email,
                Phone: user.Telefon,
                CreatedAt: user.OlusturmaTarihi ?? DateTime.UtcNow,
                AvatarUrl: null
            );
        }
    }
}
