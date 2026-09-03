using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ShopApp.Application.Abstractions;
using ShopApp.Application.Dtos.SepetDtos;
using src.Monolith.ShopApp.Domain.Sepet.Entities;

namespace ShopApp.Application.Services.SepetServices;

public class SepetService : ISepetService
{

    private readonly IShopAppDbContext _context;
    private readonly IMapper _mapper;

    public SepetService(IShopAppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<List<ResultSepetDto>> GetAllSepetAsync()
    {
        var sepet = await _context.Sepetler .ToListAsync();
        return _mapper.Map<List<ResultSepetDto>>(sepet);
    }

    public async Task<ResultSepetDto> GetSepetByIdAsync(Guid id)
    {
        var entity = await _context.Sepetler.FindAsync(id)
                     ?? throw new KeyNotFoundException($"Sepet '{id}' bulunamadı.");

        return _mapper.Map<ResultSepetDto>(entity);
    }

    public async Task<Guid> CreateSepetAsync(CreateSepetDto createSepetDto)
    {
        var value = _mapper.Map<SepetEntity>(createSepetDto);
        await _context.Sepetler .AddAsync(value);
        await _context.SaveChangesAsync();
        return value.Id;
    }

    public async Task UpdateSepetAsync(UpdateSepetDto updateSepetDto)
    {
        var entity = await _context.Sepetler .FindAsync(updateSepetDto.Id)
                     ?? throw new KeyNotFoundException($"Sepet '{updateSepetDto.Id}' bulunamadı.");

        _mapper.Map(updateSepetDto, entity);
        await _context.SaveChangesAsync();
    }


    public async Task DeleteSepetAsync(Guid Id)
    {
        var entity = await _context.Sepetler .FindAsync(Id)
                     ?? throw new KeyNotFoundException($"Sepet '{Id}' bulunamadı.");

        _context.Sepetler .Remove(entity);
        await _context.SaveChangesAsync();
    }
}