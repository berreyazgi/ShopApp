namespace src.Monolith.ShopApp.Domain.Sepet;

/// <summary>
/// Sepet durum değerlerinin veritabanında okunabilir isimlerle saklandığı
/// referans/lookup tablosu. C# tarafında SepetDurum enum'u ile senkronize tutulur.
/// </summary>
public class SepetDurumLookup
{
    /// <summary>Enum integer değeri (primary key).</summary>
    public int Id { get; set; }

    /// <summary>Okunabilir durum adı (örn. "Aktif", "Tamamlanmış").</summary>
    public string Ad { get; set; } = null!;

    public static explicit operator int(SepetDurumLookup v)
    {
        throw new NotImplementedException();
    }
}
