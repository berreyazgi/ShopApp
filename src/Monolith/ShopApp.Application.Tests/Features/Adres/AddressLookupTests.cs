using Microsoft.AspNetCore.Mvc;
using src.Monolith.ShopApp.Api.Controllers;
using src.Monolith.ShopApp.Api.Services.Address;
using Xunit;

namespace ShopApp.Application.Tests.Features.Adres;

public class AddressLookupTests
{
    [Fact]
    public void TurkeyAddressService_ReturnsProvincesDistrictsAndNeighborhoods()
    {
        var service = new TurkeyAddressService();

        var provinces = service.GetProvinces();
        Assert.Equal(81, provinces.Count);
        Assert.Contains(provinces, province => province.Id == 34 && province.Name == "İstanbul");

        var districts = service.GetDistricts(34);
        Assert.NotNull(districts);
        Assert.NotEmpty(districts!);

        var neighborhoods = service.GetNeighborhoods(34, districts![0].Id);
        Assert.NotNull(neighborhoods);
        Assert.NotEmpty(neighborhoods!);

        Assert.Null(service.GetDistricts(999));
        Assert.Null(service.GetNeighborhoods(34, 999));
    }

    [Fact]
    public void AddressLookupController_ReturnsNotFoundForUnknownSubdivision()
    {
        var controller = new AddressLookupController(new MissingAddressService());

        var result = controller.GetDistricts(999);

        Assert.IsType<NotFoundObjectResult>(result.Result);
    }

    [Fact]
    public void AddressLookupController_ListsOnlyTurkeyAndRejectsUnsupportedCountries()
    {
        var controller = new AddressLookupController(new MissingAddressService());

        var countriesResult = controller.GetCountries();
        var countries = Assert.IsType<OkObjectResult>(countriesResult.Result);
        var supportedCountries = Assert.IsAssignableFrom<IReadOnlyList<AddressCountryDto>>(countries.Value);
        Assert.Collection(supportedCountries, country =>
        {
            Assert.Equal("TR", country.Code);
            Assert.Equal("Türkiye", country.Name);
        });

        var result = controller.GetSubdivisions("US");

        Assert.IsType<NotFoundObjectResult>(result.Result);
    }

    private sealed class MissingAddressService : ITurkeyAddressService
    {
        public IReadOnlyList<AddressLookupItemDto> GetProvinces() => [];
        public IReadOnlyList<AddressLookupItemDto>? GetDistricts(int provinceId) => null;
        public IReadOnlyList<AddressLookupItemDto>? GetNeighborhoods(int provinceId, int districtId) => null;
    }
}
