using Microsoft.EntityFrameworkCore;
using src.Monolith.ShopApp.Domain.Sepet.Entities;
using src.Monolith.ShopApp.Domain.Siparisler;
using SiparisUrunleri = global::src.Monolith.ShopApp.Domain.Siparisler.SiparisUrunleri;

namespace ShopApp.Application.Abstractions;

public interface IShopAppDbContext
{
    DbSet<SiparisEntity> Siparisler { get; }
    DbSet<SepetEntity>  Sepetler { get; }
    DbSet<SepetUrunu> SepetUrunleri { get; }
    DbSet<SiparisUrunleri> SiparisUrunleri { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
