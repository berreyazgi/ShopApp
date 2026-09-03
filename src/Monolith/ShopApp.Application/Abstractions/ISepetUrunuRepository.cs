using src.Monolith.ShopApp.Domain.Sepet.Entities;

namespace ShopApp.Application.Abstractions;

public interface ISepetUrunuRepository
{
    Task<SepetUrunu?> GetByIdAsync(Guid sepetId, Guid id, CancellationToken cancellationToken = default);
    Task AddAsync(SepetUrunu sepetUrunu, CancellationToken cancellationToken = default);
    Task UpdateAsync(SepetUrunu sepetUrunu, CancellationToken cancellationToken = default);
    Task DeleteAsync(SepetUrunu sepetUrunu, CancellationToken cancellationToken = default);
}
