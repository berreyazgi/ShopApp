using ShopApp.Application.Features.Urun.Dtos;

namespace ShopApp.Application.Features.Sepet.Dtos;

/// <summary>
/// SepetUrunu only persists UrunTurId — UrunId/UrunAd/GorselUrl/Ozellikler
/// are resolved live from the UrunTur → Urun relationship at read time
/// (never denormalized/copied into SepetUrunu itself).
/// </summary>
public record ResultSepetUrunDto(
    Guid Id,
    Guid SepetId,
    Guid UrunTurId,
    Guid UrunId,
    string UrunAd,
    string? GorselUrl,
    List<ResultUrunOzellikDto> Ozellikler,
    int UrunMiktar,
    decimal FiyatGecmis)
{
    public decimal ToplamTutar => UrunMiktar * FiyatGecmis;
}
