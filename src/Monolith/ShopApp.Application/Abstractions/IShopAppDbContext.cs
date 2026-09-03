using Microsoft.EntityFrameworkCore;
using src.Monolith.ShopApp.Domain.Sepet.Entities;
using src.Monolith.ShopApp.Domain.Siparisler;

namespace ShopApp.Application.Abstractions;

public interface IShopAppDbContext
{
    DbSet<SiparisEntity> Siparisler { get; }
    DbSet<SepetEntity>  Sepetler { get; }
    DbSet<SepetUrunu> SepetUrunleri { get; }
    DbSet<src.Monolith.ShopApp.Domain.Siparisler.SiparisUrunleri> SiparisUrunleri { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
