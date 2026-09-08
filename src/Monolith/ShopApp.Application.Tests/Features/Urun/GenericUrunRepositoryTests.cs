using Microsoft.EntityFrameworkCore;
using ShopApp.Domain.Urun.Entities;
using UrunEntity = ShopApp.Domain.Urun.Entities.Urun;
using ShopApp.Infrastructure.Persistence.Context;
using ShopApp.Infrastructure.Persistence.Repositories;
using src.Monolith.ShopApp.Domain.Common;

namespace ShopApp.Application.Tests.Features.Urun;

public class GenericUrunRepositoryTests
{
    [Fact]
    public async Task CrudOperations_WorkForAllUrunEntities()
    {
        await AssertCrudAsync(new UrunEntity { UrunAd = "Ürün", MarkaAd = "Marka" });
        await AssertCrudAsync(new Kategori { KategoriAd = "Kategori" });
        await AssertCrudAsync(new UrunGorsel { GorselUrl = "https://example.com/image.jpg" });
        await AssertCrudAsync(new UrunOzellik("Renk", "Mavi", Guid.NewGuid()));
        await AssertCrudAsync(new UrunTur { Ad = "Tür", StokKod = "SKU-1" });
    }

    private static async Task AssertCrudAsync<TEntity>(TEntity entity) where TEntity : BaseEntity
    {
        await using var context = CreateContext();
        var repository = new GenericUrunRepository<TEntity>(context);

        await repository.AddAsync(entity);

        var saved = await repository.GetByIdAsync(entity.Id);
        Assert.NotNull(saved);
        Assert.Equal(entity.Id, saved.Id);

        entity.GuncellemeTarihi = DateTime.UtcNow;
        await repository.UpdateAsync(entity);
        await repository.DeleteAsync(entity);

        Assert.Null(await repository.GetByIdAsync(entity.Id));
    }

    private static ShopAppDbContext CreateContext()
    {
        var options = new DbContextOptionsBuilder<ShopAppDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        return new ShopAppDbContext(options);
    }
}
