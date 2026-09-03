using src.Monolith.ShopApp.Domain.Sepet.Entities;

namespace ShopApp.Application.Abstractions;

public interface ISepetRepository
{
    Task<SepetEntity?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task AddAsync(SepetEntity sepetEntity, CancellationToken cancellationToken = default);
    Task UpdateAsync(SepetEntity sepetEntity, CancellationToken cancellationToken = default);
    Task DeleteAsync(SepetEntity sepetEntity, CancellationToken cancellationToken = default);
}