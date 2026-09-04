using Microsoft.EntityFrameworkCore;
using ShopApp.Application.Abstractions;
using src.Monolith.ShopApp.Domain.Siparisler;

namespace ShopApp.Infrastructure.Persistence;

public class SiparisUrunuRepository : ISiparisUrunuRepository
{
    private readonly ShopAppDbContext _context;

    public SiparisUrunuRepository(ShopAppDbContext context)
    {
        _context = context;
    }

    public async Task<SiparisUrunleri?> GetByIdAsync(Guid siparisId, Guid id, CancellationToken cancellationToken = default)
    {
        return await _context.OrderItems
            .Include(x => x.SiparisEntity)
            .FirstOrDefaultAsync(x => x.Id == id && x.SiparisId == siparisId, cancellationToken);
    }

    public async Task AddAsync(SiparisUrunleri siparisUrunleri, CancellationToken cancellationToken = default)
    {
        await _context.OrderItems.AddAsync(siparisUrunleri, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(SiparisUrunleri siparisUrunleri, CancellationToken cancellationToken = default)
    {
        _context.OrderItems.Update(siparisUrunleri);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(SiparisUrunleri siparisUrunleri, CancellationToken cancellationToken = default)
    {
        _context.OrderItems.Remove(siparisUrunleri);
        await _context.SaveChangesAsync(cancellationToken);
    }
}
