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
        _context.Carts.Update(sepetEntity);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(SepetEntity sepetEntity, CancellationToken cancellationToken = default)
    {
        _context.Carts.Remove(sepetEntity);
        await _context.SaveChangesAsync(cancellationToken);
    }
}