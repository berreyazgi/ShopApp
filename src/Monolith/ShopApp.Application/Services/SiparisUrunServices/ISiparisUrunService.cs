using ShopApp.Application.Dtos.SiparisUrunleriDto;

namespace ShopApp.Application.Services.SiparisUrunServices;

public interface ISiparisUrunService
{
    Task<List<ResultSiparisUrunleriDto>> GetBySiparisIdAsync(Guid siparisId);
    Task<ResultSiparisUrunleriDto> GetByIdAsync(Guid siparisId, Guid id);
    Task<Guid> CreateSiparisUrunAsync(Guid siparisId, CreateSiparisUrunleriDto createSiparisUrunleriDto);
    Task UpdateSiparisUrunAsync(Guid siparisId, UpdateSiparisUrunleriDto updateSiparisUrunleriDto);
    Task DeleteSiparisUrunAsync(Guid siparisId, Guid id);
}