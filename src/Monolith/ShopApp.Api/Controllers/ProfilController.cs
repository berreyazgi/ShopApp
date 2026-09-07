using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShopApp.Application.Features.Profil.Commands.UpdateMyProfile;
using ShopApp.Application.Features.Profil.Dtos;
using ShopApp.Application.Features.Profil.Queries.GetMyProfile;

namespace src.Monolith.ShopApp.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/profil")]
public sealed class ProfilController : ControllerBase
{
    private readonly IMediator _mediator;

    public ProfilController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<ActionResult<UserProfileDto>> GetProfile(CancellationToken cancellationToken)
    {
        try
        {
            return Ok(await _mediator.Send(new GetMyProfile.GetMyProfileQuery(), cancellationToken));
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
            var result = await _mediator.Send(command, cancellationToken);
            return Ok(result);
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
}
