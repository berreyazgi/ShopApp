namespace ShopApp.Application.Abstractions;

public sealed record CurrentCustomer(Guid MusteriId, Guid KullaniciId);

public interface ICurrentCustomerContext
{
    Task<CurrentCustomer> GetRequiredAsync(CancellationToken cancellationToken = default);
}
