using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ShopApp.Application.Common.Interfaces;

namespace ShopApp.Application.Features.Admin.Orders.Commands.UpdateAdminOrderStatus;

public sealed class UpdateAdminOrderStatusCommandHandler(
    IShopAppDbContext context,
    IIdentityService identityService)
    : IRequestHandler<UpdateAdminOrderStatusCommand>
{
    public async Task Handle(UpdateAdminOrderStatusCommand request, CancellationToken cancellationToken)
    {
        var siparis = await context.Siparisler
            .FirstOrDefaultAsync(s => s.Id == request.Id, cancellationToken)
            ?? throw new KeyNotFoundException($"Sipariş '{request.Id}' bulunamadı.");

        // The requested status must exist as a real lookup row — never rely on
        // the FK constraint (DbUpdateException) to catch this.
        var statusExists = await context.SiparisDurumlar
            .AnyAsync(d => d.Id == request.DurumId, cancellationToken);
        if (!statusExists)
            throw new ValidationException("Geçersiz sipariş durumu.");

        // Never fall back to Guid.Empty for the audit trail — if the
        // authenticated admin's id can't be resolved, fail closed instead of
        // silently recording an anonymous/blank actor.
        var adminUserId = identityService.GetCurrentUserId()
            ?? throw new UnauthorizedAccessException("Kimlik doğrulanamadı.");

        siparis.DurumGuncelle(request.DurumId, adminUserId);
        await context.SaveChangesAsync(cancellationToken);
    }
}
