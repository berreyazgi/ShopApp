namespace src.Monolith.ShopApp.Domain.Siparisler;
public class SiparisDurumLookup
{
    /// <summary>Enum integer değeri (primary key).</summary>
    public int Id { get; set; }

    /// <summary>Okunabilir durum adı (örn. "Bekleyen Ödeme", "Teslim Edildi").</summary>
    public string DurumIsmi { get; set; } = null!;

 
}
