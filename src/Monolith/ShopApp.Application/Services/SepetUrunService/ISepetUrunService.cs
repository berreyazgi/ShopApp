using ShopApp.Application.Dtos.SepetUrunDtos;

namespace ShopApp.Application.Services.SepetUrunleri;

public interface ISepetUrunService
{
    Task<List<ResultSepetUrunDto>> GetAllSepetUrunAsync();
    Task<List<ResultSepetUrunDto>> GetBySepetIdAsync(Guid sepetId);
    Task<ResultSepetUrunDto> GetByIdAsync(Guid sepetId, Guid id);
    Task<Guid> CreateSepetUrunAsync(Guid sepetId, CreateSepetUrunDto createSepetUrunDto);
    Task CreateSepetUrunAsync(CreateSepetUrunDto createSepetUrunDto);
    Task UpdateSepetUrunAsync(Guid sepetId, UpdateSepetUrunDto updateSepetUrunDto);
    Task UpdateSepetUrunAsync(UpdateSepetUrunDto updateSepetUrunDto);
    Task DeleteSepetUrunAsync(Guid sepetId, Guid id);
    Task DeleteSepetUrunAsync(Guid Id);
}