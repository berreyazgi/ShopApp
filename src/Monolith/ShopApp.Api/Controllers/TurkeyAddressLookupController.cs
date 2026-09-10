using Microsoft.AspNetCore.Mvc;
using src.Monolith.ShopApp.Api.Services.Address;

namespace src.Monolith.ShopApp.Api.Controllers;

/// <summary>
/// Controller for static administrative location lookups in Turkey (Provinces, Districts, Neighborhoods).
/// <para>
/// <b>Architecture Note:</b> This controller serves read-only, publicly accessible geographic reference
/// data using the local administrative dataset. It is decoupled from customer data and requires no authentication.
/// For user-specific shipping and billing addresses, see <see cref="UserAddressesController"/>.
/// </para>
/// </summary>
[ApiController]
[Route("api/locations")]
[Route("api/lookup/turkey-address")]
[Route("api/address")]
public class TurkeyAddressLookupController(ITurkeyAddressService addressService) : ControllerBase
{
    /// <summary>
    /// Retrieves all 81 provinces (cities) of Turkey.
    /// </summary>
    /// <returns>A list of province lookup items containing city ID and name.</returns>
    [HttpGet("provinces")]
    public ActionResult<IReadOnlyList<AddressLookupItemDto>> GetProvinces() =>
        Ok(addressService.GetProvinces());

    /// <summary>
    /// Retrieves all districts for a specified province.
    /// </summary>
    /// <param name="provinceId">The plate code / province ID (1–81).</param>
    /// <returns>A list of district lookup items, or 404 NotFound if the province does not exist.</returns>
    [HttpGet("districts/{provinceId:int}")]
    public ActionResult<IReadOnlyList<AddressLookupItemDto>> GetDistricts(int provinceId)
    {
        var districts = addressService.GetDistricts(provinceId);
        return districts is null
            ? NotFound(new { message = "İl bulunamadı." })
            : Ok(districts);
    }

    /// <summary>
    /// Retrieves all neighborhoods for a specified district within a province.
    /// </summary>
    /// <param name="districtId">The district ID.</param>
    /// <param name="provinceId">The parent province ID (required for district resolution).</param>
    /// <returns>A list of neighborhood lookup items, or 404 NotFound if the district is not found.</returns>
    [HttpGet("neighborhoods/{districtId:int}")]
    public ActionResult<IReadOnlyList<AddressLookupItemDto>> GetNeighborhoods(int districtId, [FromQuery] int provinceId)
    {
        var neighborhoods = addressService.GetNeighborhoods(provinceId, districtId);
        return neighborhoods is null
            ? NotFound(new { message = "İlçe bulunamadı." })
            : Ok(neighborhoods);
    }
}
