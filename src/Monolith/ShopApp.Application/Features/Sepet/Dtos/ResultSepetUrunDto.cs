namespace ShopApp.Application.Features.Sepet.Dtos;

public record ResultSepetUrunDto(
    Guid Id,
    Guid SepetId,
    Guid UrunTurId,
    int UrunMiktar,
    decimal FiyatGecmis)
{
    public decimal ToplamTutar => UrunMiktar * FiyatGecmis;
}