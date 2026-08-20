namespace KategoriServis.Application.DTOs.Responses;

public class UrunResponse
{
    public Guid Id { get; set; }
    public Guid KategoriId { get; set; }
    public string KategoriIsmi { get; set; } = string.Empty;
    public string UrunIsmi { get; set; } = null!;
    public string? UrunAciklamasi { get; set; }
    public decimal Fiyat { get; set; }
    public decimal FiyatGecmis { get; set; }
    public string MarkaIsmi { get; set; } = null!;
    public string? GorselUrl { get; set; }
    
    public DateTime OlusturmaTarihi { get; set; }
}
