namespace ShopApp.Application.Features.Urun.Dtos;

public record GetByIdUrunGorselDto(
    Guid Id,
    Guid UrunId,
    string GorselUrl,
    int GorselSira,
    bool AnaGorselMi = false
)
{
    public Guid ProductId => UrunId;
    public string ImageUrl => GorselUrl;
    public int DisplayOrder => GorselSira;
    public bool IsMain => AnaGorselMi;
}
