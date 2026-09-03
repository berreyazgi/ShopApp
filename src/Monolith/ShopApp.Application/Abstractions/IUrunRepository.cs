using SepetUrunuEntity = src.Monolith.ShopApp.Domain.Sepet.Entities.SepetUrunu;

namespace ShopApp.Application.Abstractions;
public interface IUrunRepository<SepetUrunuEntity>
{
    Task<SepetUrunuEntity?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task AddAsync(SepetUrunuEntity sepet, CancellationToken cancellationToken = default);
    Task UpdateAsync(SepetUrunuEntity sepet, CancellationToken cancellationToken = default);
    
}