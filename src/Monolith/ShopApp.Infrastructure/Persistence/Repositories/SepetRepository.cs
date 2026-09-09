using Microsoft.EntityFrameworkCore;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Infrastructure.Persistence.Context;
using src.Monolith.ShopApp.Domain.Sepet.Entities;

namespace ShopApp.Infrastructure.Persistence.Repositories;

public class SepetRepository : ISepetRepository
{
    private readonly ShopAppDbContext _context;

    public SepetRepository(ShopAppDbContext context)
    {
        _context = context;
    }

    public async Task<SepetEntity?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        return await _context.Carts
            .Include(s => s.Durum)
            .Include(s => s.Urunler)
            .FirstOrDefaultAsync(s => s.Id == id, cancellationToken);
    }

    public async Task AddAsync(SepetEntity sepetEntity, CancellationToken cancellationToken = default)
    {
        await _context.Carts.AddAsync(sepetEntity, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(SepetEntity sepetEntity, CancellationToken cancellationToken = default)
    {
        // sepetEntity always comes from this same DbContext via GetByIdAsync,
        // so it — and its Urunler collection — are already tracked. Calling
        // Update() here would force-mark every reachable entity (including a
        // brand-new SepetUrunu just added to Urunler in memory) as Modified
        // instead of Added, since Guid keys are always non-default: EF would
        // then emit an UPDATE for a row that doesn't exist yet and throw
        // DbUpdateConcurrencyException. SaveChangesAsync alone lets EF's
        // change tracker classify each entity correctly (Added/Modified/
        // Deleted) from the graph as it actually is.
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(SepetEntity sepetEntity, CancellationToken cancellationToken = default)
    {
        _context.Carts.Remove(sepetEntity);
        await _context.SaveChangesAsync(cancellationToken);
    }
}