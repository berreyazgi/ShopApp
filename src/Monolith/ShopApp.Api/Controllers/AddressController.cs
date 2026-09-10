using Microsoft.AspNetCore.Mvc;
using src.Monolith.ShopApp.Api.Services.Address;

namespace src.Monolith.ShopApp.Api.Controllers;

/// <summary>
/// Backwards-compatibility alias for <see cref="TurkeyAddressLookupController"/>.
/// Deprecated in favor of <see cref="TurkeyAddressLookupController"/> mapped to /api/locations or /api/lookup/turkey-address.
/// </summary>
[Obsolete("Use TurkeyAddressLookupController instead.")]
[NonController]
public class AddressController(ITurkeyAddressService addressService) : TurkeyAddressLookupController(addressService);
