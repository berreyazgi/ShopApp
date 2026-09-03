using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ShopApp.Application.Abstractions;
using ShopApp.Application.Dtos.SepetUrunDtos;
using ShopApp.Application.Services.SepetUrunleri;
using src.Monolith.ShopApp.Domain.Sepet.Entities;

namespace ShopApp.Application.Services.SepetUrunService;

public class SepetUrunService : ISepetUrunService
{
    private readonly IShopAppDbContext _context;
    private readonly IMapper _mapper;

    public SepetUrunService(IShopAppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }


    public async Task<List<ResultSepetUrunDto>> GetAllSepetUrunAsync()
    {
        var SepetUrun = await _context.SepetUrunleri.ToListAsync();
        return _mapper.Map<List<ResultSepetUrunDto>>(SepetUrun);
    }

    public async Task<List<ResultSepetUrunDto>> GetBySepetIdAsync(Guid sepetId)
    {
        await EnsureSepetExistsAsync(sepetId);
        var sepetUrunleri = await _context.SepetUrunleri
            .Where(sepetUrunu => sepetUrunu.SepetId == sepetId)
            .ToListAsync();

        return _mapper.Map<List<ResultSepetUrunDto>>(sepetUrunleri);
    }

    public async Task<ResultSepetUrunDto> GetByIdAsync(Guid sepetId, Guid id)
    {
        var entity = await GetEntityAsync(sepetId, id);
        return _mapper.Map<ResultSepetUrunDto>(entity);
    }

    public async Task<Guid> CreateSepetUrunAsync(Guid sepetId, CreateSepetUrunDto createSepetUrunDto)
    {
        await EnsureSepetExistsAsync(sepetId);
        var value = _mapper.Map<SepetUrunu>(createSepetUrunDto with { SepetId = sepetId });
        await _context.SepetUrunleri.AddAsync(value);
        await _context.SaveChangesAsync();
        return value.Id;
    }

    public async Task CreateSepetUrunAsync(CreateSepetUrunDto createSepetUrunDto)
    {
        await CreateSepetUrunAsync(createSepetUrunDto.SepetId, createSepetUrunDto);
    }

    public async Task UpdateSepetUrunAsync(Guid sepetId, UpdateSepetUrunDto updateSepetUrunDto)
    {
        var entity = await GetEntityAsync(sepetId, updateSepetUrunDto.Id);

        _mapper.Map(updateSepetUrunDto with { SepetId = sepetId }, entity);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateSepetUrunAsync(UpdateSepetUrunDto updateSepetUrunDto)
    {
        await UpdateSepetUrunAsync(updateSepetUrunDto.SepetId, updateSepetUrunDto);
    }

    public async Task DeleteSepetUrunAsync(Guid sepetId, Guid id)
    {
        var entity = await GetEntityAsync(sepetId, id);

        _context.SepetUrunleri.Remove(entity);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteSepetUrunAsync(Guid Id)
    {
        var entity = await _context.SepetUrunleri.FindAsync(Id)
                     ?? throw new KeyNotFoundException($"Sepet Ürünü '{Id}' bulunamadı.");

        await DeleteSepetUrunAsync(entity.SepetId, Id);
    }
    private async Task<SepetUrunu> GetEntityAsync(Guid sepetId, Guid id)
    {
        await EnsureSepetExistsAsync(sepetId);

        return await _context.SepetUrunleri
                   .SingleOrDefaultAsync(sepetUrunu => sepetUrunu.Id == id && sepetUrunu.SepetId == sepetId)
               ?? throw new KeyNotFoundException($"Sepet Ürünü '{id}' bulunamadı.");
    }

    private async Task EnsureSepetExistsAsync(Guid sepetId)
    {
        if (await _context.Sepetler.FindAsync(sepetId) is null)
            throw new KeyNotFoundException($"Sepet '{sepetId}' bulunamadı.");
    }
}