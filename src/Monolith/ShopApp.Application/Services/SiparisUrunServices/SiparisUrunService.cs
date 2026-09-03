using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ShopApp.Application.Abstractions;
using ShopApp.Application.Dtos.SiparisUrunleriDto;
using src.Monolith.ShopApp.Domain.Siparisler;

namespace ShopApp.Application.Services.SiparisUrunServices;

public class SiparisUrunService : ISiparisUrunService
{
    private readonly IShopAppDbContext _context;
    private readonly IMapper _mapper;

    public SiparisUrunService(IShopAppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<List<ResultSiparisUrunleriDto>> GetBySiparisIdAsync(Guid siparisId)
    {
        await EnsureSiparisExistsAsync(siparisId);
        var siparisUrunleri = await _context.SiparisUrunleri
            .Where(siparisUrunu => siparisUrunu.SiparisId == siparisId)
            .ToListAsync();

        return _mapper.Map<List<ResultSiparisUrunleriDto>>(siparisUrunleri);
    }

    public async Task<ResultSiparisUrunleriDto> GetByIdAsync(Guid siparisId, Guid id)
    {
        var entity = await GetEntityAsync(siparisId, id);
        return _mapper.Map<ResultSiparisUrunleriDto>(entity);
    }

    public async Task<Guid> CreateSiparisUrunAsync(Guid siparisId, CreateSiparisUrunleriDto createSiparisUrunleriDto)
    {
        await EnsureSiparisExistsAsync(siparisId);
        var value = _mapper.Map<SiparisUrunleri>(createSiparisUrunleriDto with { SiparisId = siparisId });
        await _context.SiparisUrunleri.AddAsync(value);
        await _context.SaveChangesAsync();
        return value.Id;
    }

    public async Task UpdateSiparisUrunAsync(Guid siparisId, UpdateSiparisUrunleriDto updateSiparisUrunleriDto)
    {
        var entity = await GetEntityAsync(siparisId, updateSiparisUrunleriDto.Id);

        _mapper.Map(updateSiparisUrunleriDto with { SiparisId = siparisId }, entity);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteSiparisUrunAsync(Guid siparisId, Guid id)
    {
        var entity = await GetEntityAsync(siparisId, id);

        _context.SiparisUrunleri.Remove(entity);
        await _context.SaveChangesAsync();
    }

    private async Task<SiparisUrunleri> GetEntityAsync(Guid siparisId, Guid id)
    {
        await EnsureSiparisExistsAsync(siparisId);

        return await _context.SiparisUrunleri
                   .SingleOrDefaultAsync(siparisUrunu => siparisUrunu.Id == id && siparisUrunu.SiparisId == siparisId)
               ?? throw new KeyNotFoundException($"Sipariş Ürünü '{id}' bulunamadı.");
    }

    private async Task EnsureSiparisExistsAsync(Guid siparisId)
    {
        if (await _context.Siparisler.FindAsync(siparisId) is null)
            throw new KeyNotFoundException($"Sipariş '{siparisId}' bulunamadı.");
    }
}