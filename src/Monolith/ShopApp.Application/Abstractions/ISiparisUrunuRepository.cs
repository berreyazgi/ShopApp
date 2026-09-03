using src.Monolith.ShopApp.Domain.Siparisler;

namespace ShopApp.Application.Abstractions;

public interface ISiparisUrunuRepository
{
    Task<SiparisUrunleri?> GetByIdAsync(Guid siparisId, Guid id, CancellationToken cancellationToken = default);
    Task AddAsync(SiparisUrunleri siparisUrunleri, CancellationToken cancellationToken = default);
    Task UpdateAsync(SiparisUrunleri siparisUrunleri, CancellationToken cancellationToken = default);
    Task DeleteAsync(SiparisUrunleri siparisUrunleri, CancellationToken cancellationToken = default);
}
