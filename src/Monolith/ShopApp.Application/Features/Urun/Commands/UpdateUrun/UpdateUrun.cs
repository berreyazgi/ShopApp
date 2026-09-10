using MediatR;

namespace ShopApp.Application.Features.Urun.Commands.UpdateUrun;

public sealed record UpdateUrunCommand(
    Guid Id,
    Guid KategoriId,
    string UrunAd,
    string? Detay,
    decimal Fiyat,
    string MarkaAd,
    decimal GecmisFiyat,
    string? GorselUrl,
    bool AktifMi,
    List<string>? ImageUrls = null) : IRequest
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
/// English alias command for UpdateUrunCommand.
/// </summary>
public sealed record UpdateProductCommand(
    Guid Id,
    Guid CategoryId,
    string Name,
    string? Description,
    decimal Price,
    string Brand,
    decimal PreviousPrice,
    string? CoverImageUrl,
    bool IsActive,
    List<string>? ImageUrls = null) : IRequest
{
    public UpdateUrunCommand ToCommand() =>
        new(Id, CategoryId, Name, Description, Price, Brand, PreviousPrice, CoverImageUrl, IsActive, ImageUrls);
}
