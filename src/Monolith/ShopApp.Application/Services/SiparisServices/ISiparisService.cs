using ShopApp.Application.Dtos.SiparisDtos;

namespace ShopApp.Application.Services.SiparisServices;

public interface ISiparisService
{
    Task<List<ResultSiparisDto>> GetAllSiparisAsync();
    Task<ResultSiparisDto> GetSiparisByIdAsync(Guid id);
    Task<object> GetByIdAsync(Guid requestId, CancellationToken cancellationToken);
    Task<Guid> CreateSiparisAsync(CreateSiparisDto createSiparisDto);
    Task UpdateSiparisAsync(UpdateSiparisDto updateSparisDto);
    Task DeleteSiparisAsync(Guid Id);
}