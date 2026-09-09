using MediatR;
using Microsoft.EntityFrameworkCore;
using ShopApp.Application.Common.Interfaces;

namespace ShopApp.Application.Features.Admin.Customers.Commands.UpdateAdminCustomer;

public sealed class UpdateAdminCustomerCommandHandler(
    IShopAppDbContext context,
    IIdentityService identityService)
    : IRequestHandler<UpdateAdminCustomerCommand>
{
    public async Task Handle(UpdateAdminCustomerCommand request, CancellationToken cancellationToken)
    {
        // Resolve strictly through the Musteri domain boundary — this is the
        // only way this handler can identify a target, so it can never touch
        // an Identity account (e.g. an Admin) that has no Musteri record.
        var musteri = await context.Musteriler.AsNoTracking()
            .FirstOrDefaultAsync(m => m.Id == request.MusteriId, cancellationToken)
            ?? throw new KeyNotFoundException($"Müşteri '{request.MusteriId}' bulunamadı.");

        await identityService.UpdateManagedUserAsync(
            musteri.KullaniciId,
            request.Ad,
            request.Soyad,
            request.PhoneNumber,
            request.IsActive,
            cancellationToken);
    }
}
