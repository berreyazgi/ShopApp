using KategoriServis.Application.DTOs.Responses;
using KategoriServis.Domain.Entities;

namespace KategoriServis.Application.Mappings;

public static class UrunMappingExtensions
{
    public static UrunResponse ToResponse(this Urun urun)
    {
        return new UrunResponse
        {
            Id = urun.Id,
            KategoriId = urun.KategoriId,
            // Eğer veritabanı sorgusunda .Include(u => u.Kategori) yapıldıysa dolu gelir
            KategoriIsmi = urun.Kategori?.KategoriIsim ?? string.Empty,
            UrunIsmi = urun.UrunIsmi,
            UrunAciklamasi = urun.UrunAciklamasi,
            Fiyat = urun.Fiyat,
            FiyatGecmis = urun.FiyatGecmis,
            MarkaIsmi = urun.MarkaIsmi,
            GorselUrl = urun.GorselUrl,
            OlusturmaTarihi = urun.OlusturmaTarihi
        };
    }
}
