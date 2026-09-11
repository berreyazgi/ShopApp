using Microsoft.EntityFrameworkCore;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Application.Features.Urun.Commands.CreateUrun;
using ShopApp.Application.Tests.TestSupport;
using ShopApp.Domain.Urun.Entities;
using ShopApp.Infrastructure.Persistence.Context;
using ShopApp.Infrastructure.Persistence.Repositories;
using UrunEntity = ShopApp.Domain.Urun.Entities.Urun;
using Xunit;

namespace ShopApp.Application.Tests.Features.Urun;

public class CreateUrunWithInitialVariantTests
{
    private static readonly CurrentCustomer Admin = new(Guid.NewGuid(), Guid.NewGuid());

    private static ShopAppDbContext CreateContext()
    {
        var options = new DbContextOptionsBuilder<ShopAppDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;
        return new ShopAppDbContext(options);
    }

    [Fact]
    public async Task CreateUrun_WithInitialStokKod_PersistsProductAndVariantInOneSaveChanges()
    {
        using var context = CreateContext();
        var kategori = new Kategori { KategoriAd = "Ayakkabı" };
        context.Kategori.Add(kategori);
        await context.SaveChangesAsync();

        var urunRepo = new GenericUrunRepository<UrunEntity>(context);
        var kategoriRepo = new GenericUrunRepository<Kategori>(context);
        var handler = new CreateUrunCommandHandler(urunRepo, kategoriRepo, CustomerContextFactory.For(Admin).Object);

        var command = new CreateUrunCommand(
            kategori.Id,
            "Koşu Ayakkabısı",
            "Detay",
            1200m,
            "Nike",
            1500m,
            GorselUrl: null,
            AktifMi: true,
            InitialStokKod: "KOSU-001",
            InitialStokAdet: 25,
            InitialBeden: "42",
            InitialRenk: "Siyah"
        );

        var createdId = await handler.Handle(command, CancellationToken.None);

        // The product and its first variant must both exist after the single
        // Handle() call — no separate CreateUrunVaryantCommand round-trip needed.
        var savedUrun = await context.Urun
            .Include(x => x.Varyantlar)
            .FirstAsync(x => x.Id == createdId);

        Assert.Single(savedUrun.Varyantlar);
        var variant = savedUrun.Varyantlar.Single();
        Assert.Equal("KOSU-001", variant.StokKod);
        Assert.Equal(25, variant.StokAdet);
        Assert.Equal("42", variant.Beden);
        Assert.Equal("Siyah", variant.Renk);
        Assert.Equal(createdId, variant.UrunId);
        Assert.True(variant.AktifMi);
    }

    [Fact]
    public async Task CreateUrun_WithoutInitialStokKod_CreatesProductWithNoVariant()
    {
        using var context = CreateContext();
        var kategori = new Kategori { KategoriAd = "Giyim" };
        context.Kategori.Add(kategori);
        await context.SaveChangesAsync();

        var urunRepo = new GenericUrunRepository<UrunEntity>(context);
        var kategoriRepo = new GenericUrunRepository<Kategori>(context);
        var handler = new CreateUrunCommandHandler(urunRepo, kategoriRepo, CustomerContextFactory.For(Admin).Object);

        // No InitialStokKod supplied — existing callers that still create the
        // variant via a separate CreateUrunVaryantCommand must keep working.
        var command = new CreateUrunCommand(
            kategori.Id,
            "Tişört",
            "Detay",
            100m,
            "Genel",
            0m,
            GorselUrl: null,
            AktifMi: true
        );

        var createdId = await handler.Handle(command, CancellationToken.None);

        var savedUrun = await context.Urun
            .Include(x => x.Varyantlar)
            .FirstAsync(x => x.Id == createdId);

        Assert.Empty(savedUrun.Varyantlar);
    }
}
