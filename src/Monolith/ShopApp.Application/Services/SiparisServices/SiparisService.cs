using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ShopApp.Application.Abstractions;
using ShopApp.Application.Dtos.SiparisDtos;
using src.Monolith.ShopApp.Domain.Siparisler;

namespace ShopApp.Application.Services.SiparisServices;

public class SiparisService : ISiparisService
{
    private readonly IShopAppDbContext _context;
    private readonly IMapper _mapper;

    public SiparisService(IShopAppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<List<ResultSiparisDto>> GetAllSiparisAsync()
    {
        var siparisler = await _context.Siparisler.ToListAsync();
        return _mapper.Map<List<ResultSiparisDto>>(siparisler);
    }

    public async Task<ResultSiparisDto> GetSiparisByIdAsync(Guid id)
    {
        var entity = await _context.Siparisler.FindAsync(id)
                     ?? throw new KeyNotFoundException($"Sipariş '{id}' bulunamadı.");

        return _mapper.Map<ResultSiparisDto>(entity);
    }

    public async Task<object> GetByIdAsync(Guid requestId, CancellationToken cancellationToken)
        => await GetSiparisByIdAsync(requestId);

    public async Task<Guid> CreateSiparisAsync(CreateSiparisDto createSiparisDto)
    {
        var value = _mapper.Map<SiparisEntity>(createSiparisDto);
        await _context.Siparisler.AddAsync(value);
        await _context.SaveChangesAsync();
        return value.Id;
    }

    public async Task UpdateSiparisAsync(UpdateSiparisDto updateSparisDto)
    {
        var entity = await _context.Siparisler.FindAsync(updateSparisDto.Id)
            ?? throw new KeyNotFoundException($"Sipariş '{updateSparisDto.Id}' bulunamadı.");

        _mapper.Map(updateSparisDto, entity);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteSiparisAsync(Guid Id)
    {
        var entity = await _context.Siparisler.FindAsync(Id)
            ?? throw new KeyNotFoundException($"Sipariş '{Id}' bulunamadı.");

        _context.Siparisler.Remove(entity);
        await _context.SaveChangesAsync();
    }
}