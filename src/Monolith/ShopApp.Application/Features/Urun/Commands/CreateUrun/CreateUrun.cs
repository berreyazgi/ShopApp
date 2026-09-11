using MediatR;

namespace ShopApp.Application.Features.Urun.Commands.CreateUrun;

public sealed record CreateUrunCommand(
    Guid KategoriId,
    string UrunAd,
    string? Detay,
    decimal Fiyat,
    string MarkaAd,
    decimal GecmisFiyat,
    string? GorselUrl,
    bool AktifMi,
    List<string>? ImageUrls = null,
    // Optional initial UrunVaryant (SKU/stock), persisted in the same
    // SaveChanges call as the product itself — see CreateUrunCommandHandler.
    // A product created without one is a legitimate, if unusual, state (no
    // caller before this required it); StokKod is the only field that makes
    // the variant meaningful, so it's what gates whether one is created at all.
    string? InitialStokKod = null,
    int? InitialStokAdet = null,
    string? InitialBeden = null,
    string? InitialRenk = null,
    decimal? InitialFiyatFarki = null) : IRequest<Guid>
{
    public Guid CategoryId => KategoriId;
    public string Name => UrunAd;
    public string? Description => Detay;
    public decimal Price => Fiyat;
    public string Brand => MarkaAd;
    public decimal PreviousPrice => GecmisFiyat;
    public string? CoverImageUrl => GorselUrl;
    public bool IsActive => AktifMi;
}

/// <summary>
/// English alias command for CreateUrunCommand.
/// </summary>
public sealed record CreateProductCommand(
    Guid CategoryId,
    string Name,
    string? Description,
    decimal Price,
    string Brand,
    decimal PreviousPrice,
    string? CoverImageUrl,
    bool IsActive,
    List<string>? ImageUrls = null) : IRequest<Guid>
{
    public CreateUrunCommand ToCommand() =>
        new(CategoryId, Name, Description, Price, Brand, PreviousPrice, CoverImageUrl, IsActive, ImageUrls);
}