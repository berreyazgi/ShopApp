using Microsoft.EntityFrameworkCore;
using ShopApp.Application.Abstractions;
using SepetEntity = src.Monolith.ShopApp.Domain.Sepet.Entities.Sepet;

namespace ShopApp.Infrastructure.Persistence;

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

    public async Task AddAsync(SepetEntity sepet, CancellationToken cancellationToken = default)
    {
        await _context.Carts.AddAsync(sepet, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(SepetEntity sepet, CancellationToken cancellationToken = default)
    {
        _context.Carts.Update(sepet);
        await _context.SaveChangesAsync(cancellationToken);
    }
}
