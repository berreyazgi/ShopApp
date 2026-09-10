namespace ShopApp.Infrastructure.Kargo;

public sealed class KargoServiceSettings
{
    public const string SectionName = "Services:KargoServis";

    public string BaseUrl { get; init; } = string.Empty;
}
