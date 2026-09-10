namespace src.Monolith.ShopApp.Api.Services.Address;

public sealed record AddressLookupItemDto(int Id, string Name);

public interface ITurkeyAddressService
{
    IReadOnlyList<AddressLookupItemDto> GetProvinces();
    IReadOnlyList<AddressLookupItemDto>? GetDistricts(int provinceId);
    IReadOnlyList<AddressLookupItemDto>? GetNeighborhoods(int provinceId, int districtId);
}
