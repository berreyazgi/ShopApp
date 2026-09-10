using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace src.Monolith.ShopApp.Api.Controllers;

/// <summary>
/// Backwards-compatibility alias for <see cref="UserAddressesController"/>.
/// Deprecated in favor of <see cref="UserAddressesController"/> mapped to /api/users/addresses.
/// </summary>
[Obsolete("Use UserAddressesController instead.")]
[NonController]
public class AdresController(IMediator mediator) : UserAddressesController(mediator);
