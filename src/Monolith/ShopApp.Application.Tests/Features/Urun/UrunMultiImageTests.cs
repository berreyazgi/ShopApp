using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Application.Features.Urun.Commands.CreateUrun;
using ShopApp.Application.Features.Urun.Commands.UpdateUrun;
using ShopApp.Application.Features.Urun.Dtos;
using ShopApp.Application.Mapping;
using ShopApp.Application.Tests.TestSupport;
using ShopApp.Domain.Urun.Entities;
using ShopApp.Infrastructure.Persistence.Context;
using ShopApp.Infrastructure.Persistence.Repositories;
using UrunEntity = ShopApp.Domain.Urun.Entities.Urun;
using Xunit;

namespace ShopApp.Application.Tests.Features.Urun;

public class UrunMultiImageTests
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
    public async Task CreateUrun_WithMultipleImages_SavesImagesWithDisplayOrderAndMainFlag()
    {
        using var context = CreateContext();
        var kategori = new Kategori { KategoriAd = "Ayakkabı" };
        context.Kategori.Add(kategori);
        await context.SaveChangesAsync();

        var urunRepo = new GenericUrunRepository<UrunEntity>(context);
        var kategoriRepo = new GenericUrunRepository<Kategori>(context);
        var handler = new CreateUrunCommandHandler(urunRepo, kategoriRepo, CustomerContextFactory.For(Admin).Object);

        var imageUrls = new List<string>
        {
            "https://example.com/img1.jpg",
            "https://example.com/img2.jpg",
            "https://example.com/img3.jpg"
        };

        var command = new CreateUrunCommand(
            kategori.Id,
            "Koşu Ayakkabısı",
            "Detay",
            1200m,
            "Nike",
            1500m,
            GorselUrl: null,
            AktifMi: true,
            ImageUrls: imageUrls
        );

        var createdId = await handler.Handle(command, CancellationToken.None);

        var savedUrun = await context.Urun
            .Include(x => x.Gorseller)
            .FirstAsync(x => x.Id == createdId);

        Assert.Equal("https://example.com/img1.jpg", savedUrun.GorselUrl);
        Assert.Equal("https://example.com/img1.jpg", savedUrun.CoverImageUrl);
        Assert.Equal(3, savedUrun.Gorseller.Count);

        var orderedImages = savedUrun.Gorseller.OrderBy(g => g.GorselSira).ToList();
        Assert.True(orderedImages[0].AnaGorselMi);
        Assert.True(orderedImages[0].IsMain);
        Assert.Equal("https://example.com/img1.jpg", orderedImages[0].GorselUrl);
        Assert.Equal(0, orderedImages[0].GorselSira);

        Assert.False(orderedImages[1].AnaGorselMi);
        Assert.Equal(1, orderedImages[1].GorselSira);
        Assert.Equal("https://example.com/img2.jpg", orderedImages[1].GorselUrl);

        Assert.False(orderedImages[2].AnaGorselMi);
        Assert.Equal(2, orderedImages[2].GorselSira);
        Assert.Equal("https://example.com/img3.jpg", orderedImages[2].GorselUrl);
    }

    [Fact]
    public async Task UpdateUrun_WithUpdatedImages_SyncsImagesAndPreservesOrder()
    {
        using var context = CreateContext();
        var kategori = new Kategori { KategoriAd = "Giyim" };
        context.Kategori.Add(kategori);

        var urun = new UrunEntity
        {
            KategoriId = kategori.Id,
            UrunAd = "Gömlek",
            MarkaAd = "Zara",
            Fiyat = 800m,
            AktifMi = true,
            GorselUrl = "https://example.com/old.jpg",
            Gorseller =
            [
                new UrunGorsel { GorselUrl = "https://example.com/old.jpg", GorselSira = 0, AnaGorselMi = true },
                new UrunGorsel { GorselUrl = "https://example.com/remove.jpg", GorselSira = 1, AnaGorselMi = false }
            ]
        };
        context.Urun.Add(urun);
        await context.SaveChangesAsync();

        var urunRepo = new GenericUrunRepository<UrunEntity>(context);
        var kategoriRepo = new GenericUrunRepository<Kategori>(context);
        var handler = new UpdateUrunCommandHandler(urunRepo, kategoriRepo, CustomerContextFactory.For(Admin).Object, context);

        var newImageUrls = new List<string>
        {
            "https://example.com/new-main.jpg",
            "https://example.com/old.jpg"
        };

        var command = new UpdateUrunCommand(
            urun.Id,
            kategori.Id,
            urun.UrunAd,
            urun.Detay,
            urun.Fiyat,
            urun.MarkaAd,
            urun.GecmisFiyat,
            GorselUrl: null,
            AktifMi: true,
            ImageUrls: newImageUrls
        );

        await handler.Handle(command, CancellationToken.None);

        var reloadedImages = await context.UrunGorsel
            .Where(x => x.UrunId == urun.Id)
            .OrderBy(x => x.GorselSira)
            .ToListAsync();

        Assert.Equal(2, reloadedImages.Count);
        Assert.Equal("https://example.com/new-main.jpg", reloadedImages[0].GorselUrl);
        Assert.True(reloadedImages[0].AnaGorselMi);
        Assert.Equal(0, reloadedImages[0].GorselSira);

        Assert.Equal("https://example.com/old.jpg", reloadedImages[1].GorselUrl);
        Assert.False(reloadedImages[1].AnaGorselMi);
        Assert.Equal(1, reloadedImages[1].GorselSira);

        // Verify remove.jpg was deleted
        Assert.DoesNotContain(reloadedImages, g => g.GorselUrl == "https://example.com/remove.jpg");
    }

    [Fact]
    public void UrunMapping_MapsMultiImagesToResultUrunDtoAndProductDto()
    {
        var mapper = MapperFactory.Create();

        var urun = new UrunEntity
        {
            Id = Guid.NewGuid(),
            KategoriId = Guid.NewGuid(),
            UrunAd = "Ceket",
            MarkaAd = "Mango",
            Fiyat = 1500m,
            GorselUrl = "https://example.com/main.jpg",
            Gorseller =
            [
                new UrunGorsel { GorselUrl = "https://example.com/main.jpg", GorselSira = 0, AnaGorselMi = true },
                new UrunGorsel { GorselUrl = "https://example.com/back.jpg", GorselSira = 1, AnaGorselMi = false }
            ]
        };

        var resultDto = mapper.Map<ResultUrunDto>(urun);
        Assert.NotNull(resultDto.ImageUrls);
        Assert.Equal(2, resultDto.ImageUrls.Count);
        Assert.Equal("https://example.com/main.jpg", resultDto.ImageUrls[0]);
        Assert.Equal("https://example.com/back.jpg", resultDto.ImageUrls[1]);
        Assert.Equal(2, resultDto.Images.Count);
        Assert.True(resultDto.Images[0].IsMain);

        var productDto = mapper.Map<ProductDto>(urun);
        Assert.Equal("Ceket", productDto.Name);
        Assert.Equal("Mango", productDto.Brand);
        Assert.Equal(1500m, productDto.Price);
        Assert.NotNull(productDto.ImageUrls);
        Assert.Equal(2, productDto.ImageUrls.Count);
        Assert.Equal(2, productDto.Images?.Count);
        Assert.True(productDto.Images?[0].IsMain);
    }
}
