using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShopApp.Application.Features.Adres.Commands.CreateAddress;
using ShopApp.Application.Features.Adres.Commands.DeleteAddress;
using ShopApp.Application.Features.Adres.Commands.UpdateAddress;
using ShopApp.Application.Features.Adres.Dtos;
using ShopApp.Application.Features.Adres.Queries.GetMyAddress;
using ShopApp.Application.Features.Adres.Queries.GetMyAddresses;
using ShopApp.Application.Features.Profil.Commands.UpdateMyProfile;
using ShopApp.Application.Features.Profil.Dtos;
using ShopApp.Application.Features.Profil.Queries.GetMyProfile;

namespace src.Monolith.ShopApp.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public sealed class ProfileController(IMediator mediator) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<UserProfileDto>> GetProfile(CancellationToken cancellationToken)
    {
        try
        {
            return Ok(await mediator.Send(new GetMyProfile.GetMyProfileQuery(), cancellationToken));
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }

    [HttpPut]
    public async Task<ActionResult<UserProfileDto>> UpdateProfile([FromBody] UpdateMyProfileCommand command, CancellationToken cancellationToken)
    {
        try
        {
            return Ok(await mediator.Send(command, cancellationToken));
        }
        catch (ValidationException ex)
        {
            return BadRequest(new { errors = ex.Errors.Select(e => new { field = e.PropertyName, message = e.ErrorMessage }) });
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }

    [HttpGet("addresses")]
    public async Task<ActionResult<List<AddressDto>>> GetAddresses(CancellationToken cancellationToken) =>
        Ok(await mediator.Send(new GetMyAddresses.GetMyAddressesQuery(), cancellationToken));

    [HttpGet("addresses/{id:guid}")]
    public async Task<ActionResult<AddressDto>> GetAddress(Guid id, CancellationToken cancellationToken)
    {
        try
        {
            return Ok(await mediator.Send(new GetMyAddress.GetMyAddressQuery(id), cancellationToken));
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }

    [HttpPost("addresses")]
    public async Task<ActionResult<AddressDto>> CreateAddress([FromBody] CreateAddressCommand command, CancellationToken cancellationToken)
    {
        try
        {
            var result = await mediator.Send(command, cancellationToken);
            return CreatedAtAction(nameof(GetAddress), new { id = result.Id }, result);
        }
        catch (ValidationException ex)
        {
            return BadRequest(new { errors = ex.Errors.Select(e => new { field = e.PropertyName, message = e.ErrorMessage }) });
        }
    }

    [HttpPut("addresses/{id:guid}")]
    public async Task<ActionResult<AddressDto>> UpdateAddress(Guid id, [FromBody] UpdateAddressCommand command, CancellationToken cancellationToken)
    {
        if (command.Id != id)
            return BadRequest(new { message = "İstek gövdesindeki adres kimliği rota kimliğiyle eşleşmelidir." });

        try
        {
            return Ok(await mediator.Send(command, cancellationToken));
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

    [HttpDelete("addresses/{id:guid}")]
    public async Task<IActionResult> DeleteAddress(Guid id, CancellationToken cancellationToken)
    {
        try
        {
            await mediator.Send(new DeleteAddressCommand(id), cancellationToken);
            return NoContent();
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }
}
