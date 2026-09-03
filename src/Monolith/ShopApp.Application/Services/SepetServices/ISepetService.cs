using ShopApp.Application.Dtos.SepetDtos;

namespace ShopApp.Application.Services.SepetServices;

public interface ISepetService
{
    Task<List<ResultSepetDto>> GetAllSepetAsync();
    Task<ResultSepetDto> GetSepetByIdAsync(Guid id);
    Task<Guid> CreateSepetAsync(CreateSepetDto createSepetDto);
    Task UpdateSepetAsync(UpdateSepetDto updateSepetDto);
    Task DeleteSepetAsync(Guid Id);
}