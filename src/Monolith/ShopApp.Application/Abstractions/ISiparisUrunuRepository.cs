using src.Monolith.ShopApp.Domain.Siparisler;

namespace ShopApp.Application.Abstractions;

public interface ISiparisUrunuRepository
{
    Task<src.Monolith.ShopApp.Domain.Siparisler.SiparisUrunleri?> GetByIdAsync(Guid siparisId, Guid id, CancellationToken cancellationToken = default);
    Task AddAsync(src.Monolith.ShopApp.Domain.Siparisler.SiparisUrunleri siparisUrunleri, CancellationToken cancellationToken = default);
    Task UpdateAsync(src.Monolith.ShopApp.Domain.Siparisler.SiparisUrunleri siparisUrunleri, CancellationToken cancellationToken = default);
    Task DeleteAsync(src.Monolith.ShopApp.Domain.Siparisler.SiparisUrunleri siparisUrunleri, CancellationToken cancellationToken = default);
}
