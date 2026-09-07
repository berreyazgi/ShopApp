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

[Authorize]
[ApiController]
[Route("api/adres")]
public sealed class AdresController : ControllerBase
{
    private readonly IMediator _mediator;

    public AdresController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<ActionResult<List<AddressDto>>> GetMyAddresses(CancellationToken cancellationToken)
    {
        return Ok(await _mediator.Send(new GetMyAddresses.GetMyAddressesQuery(), cancellationToken));
    }

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
