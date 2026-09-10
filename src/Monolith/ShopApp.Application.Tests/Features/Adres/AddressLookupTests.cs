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
    public void TurkeyAddressLookupController_ReturnsNotFoundForUnknownParent()
    {
        var controller = new TurkeyAddressLookupController(new MissingAddressService());

        var result = controller.GetDistricts(999);

        Assert.IsType<NotFoundObjectResult>(result.Result);
    }

    [Fact]
    public void AddressController_ReturnsNotFoundForUnknownParent()
    {
        var controller = new TurkeyAddressLookupController(new MissingAddressService());

        var result = controller.GetDistricts(999);

        Assert.IsType<NotFoundObjectResult>(result.Result);
    }

    private sealed class MissingAddressService : ITurkeyAddressService
    {
        public IReadOnlyList<AddressLookupItemDto> GetProvinces() => [];
        public IReadOnlyList<AddressLookupItemDto>? GetDistricts(int provinceId) => null;
        public IReadOnlyList<AddressLookupItemDto>? GetNeighborhoods(int provinceId, int districtId) => null;
    }
}
