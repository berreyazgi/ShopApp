namespace ShopApp.Application.Common.Interfaces;

public sealed record CurrentCustomer(Guid MusteriId, Guid KullaniciId);

public interface ICurrentCustomerContext
{
    Task<CurrentCustomer> GetRequiredAsync(CancellationToken cancellationToken = default);

    /// <summary>
    /// Resolves only the authenticated user's KullaniciId (from the JWT subject), without
    /// requiring a Musteri profile. Use this for admin-only operations whose audit fields
    /// (OlusturanKullaniciId/DegistirenKullaniciId) must work for accounts that are never
    /// provisioned as a Musteri, such as Admin.
    /// </summary>
    Task<Guid> GetCurrentKullaniciIdAsync(CancellationToken cancellationToken = default);
}
