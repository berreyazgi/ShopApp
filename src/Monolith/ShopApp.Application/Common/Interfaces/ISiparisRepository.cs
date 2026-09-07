using src.Monolith.ShopApp.Domain.Siparis.Entities;

namespace ShopApp.Application.Common.Interfaces;

public interface ISiparisRepository
{
    Task<SiparisEntity?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task AddAsync(SiparisEntity siparisEntity, CancellationToken cancellationToken = default);
    Task UpdateAsync(SiparisEntity siparisEntity, CancellationToken cancellationToken = default);
    Task DeleteAsync(SiparisEntity siparisEntity, CancellationToken cancellationToken = default);
}
