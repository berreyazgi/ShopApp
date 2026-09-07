using Microsoft.EntityFrameworkCore;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Infrastructure.Persistence.Context;
using src.Monolith.ShopApp.Domain.Siparis.Entities;

namespace ShopApp.Infrastructure.Persistence.Repositories;

public class SiparisRepository : ISiparisRepository
{
    private readonly ShopAppDbContext _context;

    public SiparisRepository(ShopAppDbContext context)
    {
        _context = context;
    }

    public async Task<SiparisEntity?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        return await _context.Orders
            .Include(s => s.Durum)
            .Include(s => s.Urunler)
            .FirstOrDefaultAsync(s => s.Id == id, cancellationToken);
    }

    public async Task AddAsync(SiparisEntity siparisEntity, CancellationToken cancellationToken = default)
    {
        await _context.Orders.AddAsync(siparisEntity, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(SiparisEntity siparisEntity, CancellationToken cancellationToken = default)
    {
        _context.Orders.Update(siparisEntity);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(SiparisEntity siparisEntity, CancellationToken cancellationToken = default)
    {
        _context.Orders.Remove(siparisEntity);
        await _context.SaveChangesAsync(cancellationToken);
    }
}
