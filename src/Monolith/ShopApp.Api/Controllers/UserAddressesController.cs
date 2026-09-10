using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShopApp.Application.Features.Adres.Commands.CreateAddress;
using ShopApp.Application.Features.Adres.Commands.DeleteAddress;
using ShopApp.Application.Features.Adres.Commands.UpdateAddress;
using ShopApp.Application.Features.Adres.Dtos;
using ShopApp.Application.Features.Adres.Queries.GetMyAddresses;

namespace src.Monolith.ShopApp.Api.Controllers;

/// <summary>
/// Dedicated controller for managing customer delivery, shipping, and billing addresses.
/// <para>
/// <b>Security &amp; Architecture:</b> All endpoints require authentication (<c>[Authorize]</c>)
/// and derive ownership strictly from the authenticated customer's JWT claims via <c>ICurrentCustomerContext</c>.
/// Customers can only view, update, or delete their own addresses.
/// For public administrative location lookups (provinces, districts, neighborhoods), see <see cref="TurkeyAddressLookupController"/>.
/// </para>
/// </summary>
[Authorize]
[ApiController]
[Route("api/users/addresses")]
[Route("api/adres")]
public class UserAddressesController : ControllerBase
{
    private readonly IMediator _mediator;

    public UserAddressesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// Retrieves all saved addresses belonging to the currently authenticated customer.
    /// </summary>
    /// <param name="cancellationToken">Cancellation token.</param>
    /// <returns>A list of the authenticated customer's addresses.</returns>
    [HttpGet]
    public async Task<ActionResult<List<AddressDto>>> GetMyAddresses(CancellationToken cancellationToken)
    {
        return Ok(await _mediator.Send(new GetMyAddresses.GetMyAddressesQuery(), cancellationToken));
    }

    /// <summary>
    /// Creates a new delivery address associated with the authenticated customer.
    /// </summary>
    /// <param name="command">The address payload containing province, district, neighborhood, and contact details.</param>
    /// <param name="cancellationToken">Cancellation token.</param>
    /// <returns>The created address details with status 201 Created.</returns>
    [HttpPost]
    public async Task<ActionResult<AddressDto>> Create([FromBody] CreateAddressCommand command, CancellationToken cancellationToken)
    {
        try
        {
            var result = await _mediator.Send(command, cancellationToken);
            return StatusCode(StatusCodes.Status201Created, result);
        }
        catch (ValidationException ex)
        {
            return BadRequest(new { errors = ex.Errors.Select(e => new { field = e.PropertyName, message = e.ErrorMessage }) });
        }
    }

    /// <summary>
    /// Updates an existing address belonging to the authenticated customer.
    /// </summary>
    /// <param name="id">The GUID of the address to update.</param>
    /// <param name="command">The updated address information.</param>
    /// <param name="cancellationToken">Cancellation token.</param>
    /// <returns>The updated address data.</returns>
    [HttpPut("{id:guid}")]
    public async Task<ActionResult<AddressDto>> Update(Guid id, [FromBody] UpdateAddressCommand command, CancellationToken cancellationToken)
    {
        if (command.Id != id)
            return BadRequest(new { message = "İstek gövdesindeki adres kimliği rota kimliğiyle eşleşmelidir." });

        try
        {
            var result = await _mediator.Send(command, cancellationToken);
            return Ok(result);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
        catch (ValidationException ex)
        {
            return BadRequest(new { errors = ex.Errors.Select(e => new { field = e.PropertyName, message = e.ErrorMessage }) });
        }
    }

    /// <summary>
    /// Deletes a saved address belonging to the authenticated customer.
    /// </summary>
    /// <param name="id">The GUID of the address to delete.</param>
    /// <param name="cancellationToken">Cancellation token.</param>
    /// <returns>204 NoContent if deleted successfully, or 404 NotFound if the address does not exist or belong to the caller.</returns>
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        try
        {
            await _mediator.Send(new DeleteAddressCommand(id), cancellationToken);
            return NoContent();
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }
}
