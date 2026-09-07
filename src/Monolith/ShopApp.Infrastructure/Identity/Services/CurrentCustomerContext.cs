using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Infrastructure.Persistence.Context;

namespace ShopApp.Infrastructure.Identity.Services;

public sealed class CurrentCustomerContext(
    IHttpContextAccessor httpContextAccessor,
    ShopAppDbContext dbContext) : ICurrentCustomerContext
{
    public async Task<CurrentCustomer> GetRequiredAsync(CancellationToken cancellationToken = default)
    {
        var subject = httpContextAccessor.HttpContext?.User
            .FindFirstValue(JwtRegisteredClaimNames.Sub);

        if (!Guid.TryParse(subject, out var kullaniciId))
            throw new UnauthorizedAccessException("Geçerli bir kullanıcı kimliği bulunamadı.");

        var musteriId = await dbContext.Musteriler
            .AsNoTracking()
            .Where(x => x.KullaniciId == kullaniciId)
            .Select(x => (Guid?)x.Id)
            .SingleOrDefaultAsync(cancellationToken)
            ?? throw new InvalidOperationException("Müşteri profili bulunamadı.");

        return new CurrentCustomer(musteriId, kullaniciId);
    }
}
