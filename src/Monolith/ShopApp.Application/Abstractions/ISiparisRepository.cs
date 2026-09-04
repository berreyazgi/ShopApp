using src.Monolith.ShopApp.Domain.Siparisler;

namespace ShopApp.Application.Abstractions;

public interface ISiparisRepository
{
    Task<SiparisEntity?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task AddAsync(SiparisEntity siparisEntity, CancellationToken cancellationToken = default);
    Task UpdateAsync(SiparisEntity siparisEntity, CancellationToken cancellationToken = default);
    Task DeleteAsync(SiparisEntity siparisEntity, CancellationToken cancellationToken = default);
}
