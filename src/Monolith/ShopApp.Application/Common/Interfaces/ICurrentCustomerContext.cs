namespace ShopApp.Application.Common.Interfaces;

public sealed record CurrentCustomer(Guid MusteriId, Guid KullaniciId);

public interface ICurrentCustomerContext
{
    Task<CurrentCustomer> GetRequiredAsync(CancellationToken cancellationToken = default);
}
