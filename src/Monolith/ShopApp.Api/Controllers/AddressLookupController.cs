using Microsoft.AspNetCore.Mvc;
using src.Monolith.ShopApp.Api.Services.Address;

namespace src.Monolith.ShopApp.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class AddressLookupController(ITurkeyAddressService addressService) : ControllerBase
{
    private const string DefaultCountryCode = "TR";

    [HttpGet("countries")]
    [ResponseCache(Duration = 86400)]
    public ActionResult<IReadOnlyList<AddressCountryDto>> GetCountries() =>
        Ok(new[] { new AddressCountryDto(DefaultCountryCode, "Türkiye") });

    [HttpGet("countries/{countryCode=TR}/subdivisions")]
    [ResponseCache(Duration = 86400)]
    public ActionResult<IReadOnlyList<AddressLookupItemDto>> GetSubdivisions(string countryCode = DefaultCountryCode)
    {
        if (!IsSupportedCountry(countryCode))
            return NotFound(new { message = "Ülke desteklenmiyor." });

        return Ok(addressService.GetProvinces());
    }

    [HttpGet("subdivisions/{subdivisionId:int}/districts")]
    [ResponseCache(Duration = 86400)]
    public ActionResult<IReadOnlyList<AddressLookupItemDto>> GetDistricts(
        int subdivisionId,
        [FromQuery] string countryCode = DefaultCountryCode)
    {
        if (!IsSupportedCountry(countryCode))
            return NotFound(new { message = "Ülke desteklenmiyor." });

        var districts = addressService.GetDistricts(subdivisionId);
        return districts is null
            ? NotFound(new { message = "Alt bölüm bulunamadı." })
            : Ok(districts);
    }

    [HttpGet("subdivisions/{subdivisionId:int}/districts/{districtId:int}/neighborhoods")]
    [ResponseCache(Duration = 86400)]
    public ActionResult<IReadOnlyList<AddressLookupItemDto>> GetNeighborhoods(
        int subdivisionId,
        int districtId,
        [FromQuery] string countryCode = DefaultCountryCode)
    {
        if (!IsSupportedCountry(countryCode))
            return NotFound(new { message = "Ülke desteklenmiyor." });

        var neighborhoods = addressService.GetNeighborhoods(subdivisionId, districtId);
        return neighborhoods is null
            ? NotFound(new { message = "İlçe bulunamadı." })
            : Ok(neighborhoods);
    }

    private static bool IsSupportedCountry(string countryCode) =>
        string.Equals(countryCode, DefaultCountryCode, StringComparison.OrdinalIgnoreCase);
}
