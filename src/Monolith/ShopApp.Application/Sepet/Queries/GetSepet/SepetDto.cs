namespace ShopApp.Application.Sepet.Queries;

public class SepetDto
{
    public Guid Id { get; set; }

    public string MusteriId { get; set; } = null!;

    public int DurumId { get; set; }

    public string? DurumIsmi { get; set; }

    public List<SepetUrunDto> Urunler { get; set; } = [];


}