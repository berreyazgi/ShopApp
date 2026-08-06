namespace src.Monolith.ShopApp.Domain.Siparisler;
public class SiparisDurumLookup
{
    /// <summary>Enum integer değeri (primary key).</summary>
    public int Id { get; set; }

    /// <summary>Okunabilir durum adı (örn. "Bekleyen Ödeme", "Teslim Edildi").</summary>
    public string Ad { get; set; } = null!;

    public static explicit operator int(SiparisDurumLookup v)
    {
        throw new NotImplementedException();
    }
}
