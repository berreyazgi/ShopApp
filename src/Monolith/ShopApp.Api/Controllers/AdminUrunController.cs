using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShopApp.Application.Features.Urun.Commands.CreateUrun;
using ShopApp.Application.Features.Urun.Commands.DeleteUrun;
using ShopApp.Application.Features.Urun.Commands.UpdateUrun;

namespace src.Monolith.ShopApp.Api.Controllers;

[ApiController]
[Route("api/admin/urun")]
[Authorize(Roles = "Admin")]
public sealed class AdminUrunController : ControllerBase
{
    private readonly IMediator _mediator;

    public AdminUrunController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateUrunCommand command, CancellationToken cancellationToken)
    {
        try
        {
            var id = await _mediator.Send(command, cancellationToken);
            return CreatedAtAction(nameof(UrunController.GetById), "Urun", new { id }, new { id });
        }
        catch (KeyNotFoundException exception)
        {
            return NotFound(new { message = exception.Message });
        }
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateUrunCommand command, CancellationToken cancellationToken)
    {
        if (command.Id != id)
            return BadRequest(new { message = "İstek gövdesindeki ürün kimliği rota kimliğiyle eşleşmelidir." });

        try
        {
            await _mediator.Send(command, cancellationToken);
            return NoContent();
        }
        catch (KeyNotFoundException exception)
        {
            return NotFound(new { message = exception.Message });
        }
        catch (ValidationException exception)
        {
            return BadRequest(new
            {
                message = exception.Message,
                errors = exception.Errors.Select(e => new { field = e.PropertyName, message = e.ErrorMessage })
            });
        }
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        try
        {
            await _mediator.Send(new DeleteUrunCommand(id), cancellationToken);
            return NoContent();
        }
        catch (KeyNotFoundException exception)
        {
            return NotFound(new { message = exception.Message });
        }
    }
}
