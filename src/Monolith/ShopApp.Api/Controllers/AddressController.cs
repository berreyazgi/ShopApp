using Microsoft.AspNetCore.Mvc;
using src.Monolith.ShopApp.Api.Services.Address;

namespace src.Monolith.ShopApp.Api.Controllers;

[ApiController]
[Route("api/address")]
public sealed class AddressController(ITurkeyAddressService addressService) : ControllerBase
{
    [HttpGet("provinces")]
    public ActionResult<IReadOnlyList<AddressLookupItemDto>> GetProvinces() =>
        Ok(addressService.GetProvinces());

    [HttpGet("districts/{provinceId:int}")]
    public ActionResult<IReadOnlyList<AddressLookupItemDto>> GetDistricts(int provinceId)
    {
        var districts = addressService.GetDistricts(provinceId);
        return districts is null
            ? NotFound(new { message = "İl bulunamadı." })
            : Ok(districts);
    }

    [HttpGet("neighborhoods/{districtId:int}")]
    public ActionResult<IReadOnlyList<AddressLookupItemDto>> GetNeighborhoods(int districtId, [FromQuery] int provinceId)
    {
        var neighborhoods = addressService.GetNeighborhoods(provinceId, districtId);
        return neighborhoods is null
            ? NotFound(new { message = "İlçe bulunamadı." })
            : Ok(neighborhoods);
    }
}
