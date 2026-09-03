namespace ShopApp.Application.SepetUrunleri.Dtos;

public record ResultSepetUrunDto(
    Guid Id,
    Guid SepetId,
    Guid UrunTurId,
    int UrunMiktar,
    int UrunAdet,
    decimal FiyatGecmis)
{
    public decimal ToplamTutar => UrunAdet * FiyatGecmis;
}