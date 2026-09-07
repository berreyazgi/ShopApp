using Microsoft.EntityFrameworkCore;
using src.Monolith.ShopApp.Domain.Sepet.Entities;
using src.Monolith.ShopApp.Domain.Siparis.Entities;

namespace ShopApp.Application.Common.Interfaces;

public interface IShopAppDbContext
{
    DbSet<SiparisEntity> Siparisler { get; }
    DbSet<SepetEntity>  Sepetler { get; }
    DbSet<SepetUrunu> SepetUrunleri { get; }
    DbSet<src.Monolith.ShopApp.Domain.Siparis.Entities.SiparisUrunleri> SiparisUrunleri { get; }
    DbSet<src.Monolith.ShopApp.Domain.Kullanici.Address> Adresler { get; }
    DbSet<src.Monolith.ShopApp.Domain.Kullanici.Musteri> Musteriler { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
