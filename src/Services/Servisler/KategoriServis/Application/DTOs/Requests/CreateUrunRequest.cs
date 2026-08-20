namespace KategoriServis.Application.DTOs.Requests;

public class CreateUrunRequest
{
    public Guid KategoriId { get; set; }
    
    public string UrunIsmi { get; set; } = null!;
    
    public string? UrunAciklamasi { get; set; }
    
    public decimal Fiyat { get; set; }
    
    public string MarkaIsmi { get; set; } = null!;
}
