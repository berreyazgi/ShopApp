using Microsoft.EntityFrameworkCore;
using ShopApp.Domain.Urun.Entities;
using src.Monolith.ShopApp.Domain.Kullanici;
using src.Monolith.ShopApp.Domain.Sepet.Entities;
using src.Monolith.ShopApp.Domain.Siparis.Entities;

namespace ShopApp.Application.Common.Interfaces;

public interface IShopAppDbContext
{
    DbSet<SiparisEntity> Siparisler { get; }
    DbSet<SepetEntity>  Sepetler { get; }
    DbSet<SepetUrunu> SepetUrunleri { get; }
    DbSet<SiparisUrunleri> SiparisUrunleri { get; }
    DbSet<Urun> Urun { get; }
    DbSet<Kategori> Kategori { get; }
    DbSet<UrunGorsel> UrunGorsel { get; }
    DbSet<UrunTur> UrunTur { get; }
    DbSet<UrunOzellik> UrunOzellik { get; }    
    
    DbSet<Address> Adresler { get; }
    DbSet<Musteri> Musteriler { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
