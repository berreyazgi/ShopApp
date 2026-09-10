using TurkiyeCitiesPackage;

namespace src.Monolith.ShopApp.Api.Services.Address;

public sealed class TurkeyAddressService : ITurkeyAddressService
{
    private readonly CityServices _cityServices = new();

    public IReadOnlyList<AddressLookupItemDto> GetProvinces() => _cityServices
        .GetAllCities()
        .OrderBy(city => city.Id)
        .Select(city => new AddressLookupItemDto(city.Id, city.Name))
        .ToList();

    public IReadOnlyList<AddressLookupItemDto>? GetDistricts(int provinceId)
    {
        if (_cityServices.GetCityById(provinceId) is null)
            return null;

        return _cityServices
            .GetDistrictsByCityId(provinceId)
            .OrderBy(district => district.Name)
            .Select(district => new AddressLookupItemDto(district.Id, district.Name))
            .ToList();
    }

    public IReadOnlyList<AddressLookupItemDto>? GetNeighborhoods(int provinceId, int districtId)
    {
        if (_cityServices.GetDistrictById(provinceId, districtId) is null)
            return null;

        return _cityServices
            .GetNeighborhoodsByDistrictId(provinceId, districtId)
            .OrderBy(neighborhood => neighborhood.Name)
            .Select(neighborhood => new AddressLookupItemDto(neighborhood.Id, neighborhood.Name))
            .ToList();
    }
}
