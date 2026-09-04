using Microsoft.EntityFrameworkCore;
using ShopApp.Application.Abstractions;
using src.Monolith.ShopApp.Domain.Sepet.Entities;

namespace ShopApp.Infrastructure.Persistence;

public class SepetUrunuRepository : ISepetUrunuRepository
{
    private readonly ShopAppDbContext _context;

    public SepetUrunuRepository(ShopAppDbContext context)
    {
        _context = context;
    }

    public async Task<SepetUrunu?> GetByIdAsync(Guid sepetId, Guid id, CancellationToken cancellationToken = default)
    {
        return await _context.CartItems
            .Include(x => x.SepetEntity)
            .FirstOrDefaultAsync(x => x.Id == id && x.SepetId == sepetId, cancellationToken);
    }

    public async Task AddAsync(SepetUrunu sepetUrunu, CancellationToken cancellationToken = default)
    {
        await _context.CartItems.AddAsync(sepetUrunu, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(SepetUrunu sepetUrunu, CancellationToken cancellationToken = default)
    {
        _context.CartItems.Update(sepetUrunu);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(SepetUrunu sepetUrunu, CancellationToken cancellationToken = default)
    {
        _context.CartItems.Remove(sepetUrunu);
        await _context.SaveChangesAsync(cancellationToken);
    }
}
