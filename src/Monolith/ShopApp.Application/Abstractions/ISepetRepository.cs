using SepetEntity = src.Monolith.ShopApp.Domain.Sepet.Entities.Sepet;

namespace ShopApp.Application.Abstractions;

public interface ISepetRepository
{
    Task<SepetEntity?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task AddAsync(SepetEntity sepet, CancellationToken cancellationToken = default);
    Task UpdateAsync(SepetEntity sepet, CancellationToken cancellationToken = default);
}