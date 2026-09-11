using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShopApp.Application.Features.Urun.Commands.CreateUrun;
using ShopApp.Application.Features.Urun.Commands.CreateUrunGorsel;
using ShopApp.Application.Features.Urun.Commands.CreateUrunOzellik;
using ShopApp.Application.Features.Urun.Commands.CreateUrunVaryant;
using ShopApp.Application.Features.Urun.Commands.DeleteUrun;
using ShopApp.Application.Features.Urun.Commands.DeleteUrunGorsel;
using ShopApp.Application.Features.Urun.Commands.DeleteUrunOzellik;
using ShopApp.Application.Features.Urun.Commands.DeleteUrunVaryant;
using ShopApp.Application.Features.Urun.Commands.UpdateUrun;
using ShopApp.Application.Features.Urun.Commands.UpdateUrunGorsel;
using ShopApp.Application.Features.Urun.Commands.UpdateUrunOzellik;
using ShopApp.Application.Features.Urun.Commands.UpdateUrunVaryant;
using ShopApp.Application.Features.Urun.Dtos;
using ShopApp.Application.Features.Urun.Queries;

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

    [HttpGet]
    public async Task<ActionResult<List<AdminUrunListDto>>> GetAll([FromQuery] Guid? kategoriId, CancellationToken cancellationToken)
        => Ok(await _mediator.Send(new GetAdminUrunler.GetAdminUrunlerQuery(kategoriId), cancellationToken));

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<GetByIdUrunDto>> GetById(Guid id, CancellationToken cancellationToken)
    {
        try
        {
            return Ok(await _mediator.Send(new GetUrun.GetUrunQuery(id, IncludePassive: true), cancellationToken));
        }
        catch (KeyNotFoundException exception)
        {
            return NotFound(new { message = exception.Message });
        }
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

    [HttpPost("{urunId:guid}/varyantlar")]
    public async Task<IActionResult> CreateVaryant(Guid urunId, [FromBody] CreateUrunVaryantCommand command, CancellationToken cancellationToken)
    {
        if (command.UrunId != urunId)
            return BadRequest(new { message = "İstek gövdesindeki ürün kimliği rota kimliğiyle eşleşmelidir." });

        try
        {
            var id = await _mediator.Send(command, cancellationToken);
            return CreatedAtAction(nameof(GetById), new { id = urunId }, new { id });
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

    [HttpPut("{urunId:guid}/varyantlar/{id:guid}")]
    public async Task<IActionResult> UpdateVaryant(Guid urunId, Guid id, [FromBody] UpdateUrunVaryantCommand command, CancellationToken cancellationToken)
    {
        if (command.UrunId != urunId || command.Id != id)
            return BadRequest(new { message = "İstek gövdesindeki varyant kimliği rota kimliğiyle eşleşmelidir." });

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

    [HttpDelete("{urunId:guid}/varyantlar/{id:guid}")]
    public async Task<IActionResult> DeleteVaryant(Guid urunId, Guid id, CancellationToken cancellationToken)
    {
        try
        {
            await _mediator.Send(new DeleteUrunVaryantCommand(urunId, id), cancellationToken);
            return NoContent();
        }
        catch (KeyNotFoundException exception)
        {
            return NotFound(new { message = exception.Message });
        }
    }

    [HttpGet("{urunId:guid}/gorsel")]
    public async Task<ActionResult<List<ResultUrunGorselDto>>> GetGorseller(Guid urunId, CancellationToken cancellationToken)
    {
        try
        {
            return Ok(await _mediator.Send(new GetUrunGorselleri.GetUrunGorselleriQuery(urunId), cancellationToken));
        }
        catch (KeyNotFoundException exception)
        {
            return NotFound(new { message = exception.Message });
        }
    }

    [HttpPost("{urunId:guid}/gorsel")]
    public async Task<IActionResult> CreateGorsel(Guid urunId, [FromBody] CreateUrunGorselCommand command, CancellationToken cancellationToken)
    {
        if (command.UrunId != urunId)
            return BadRequest(new { message = "İstek gövdesindeki ürün kimliği rota kimliğiyle eşleşmelidir." });

        try
        {
            var id = await _mediator.Send(command, cancellationToken);
            return CreatedAtAction(nameof(GetGorseller), new { urunId }, new { id });
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

    [HttpPut("{urunId:guid}/gorsel/{id:guid}")]
    public async Task<IActionResult> UpdateGorsel(Guid urunId, Guid id, [FromBody] UpdateUrunGorselCommand command, CancellationToken cancellationToken)
    {
        if (command.UrunId != urunId || command.Id != id)
            return BadRequest(new { message = "İstek gövdesindeki ürün görseli kimliği rota kimliğiyle eşleşmelidir." });

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

    [HttpDelete("{urunId:guid}/gorsel/{id:guid}")]
    public async Task<IActionResult> DeleteGorsel(Guid urunId, Guid id, CancellationToken cancellationToken)
    {
        try
        {
            await _mediator.Send(new DeleteUrunGorselCommand(urunId, id), cancellationToken);
            return NoContent();
        }
        catch (KeyNotFoundException exception)
        {
            return NotFound(new { message = exception.Message });
        }
    }

    [HttpGet("{urunId:guid}/ozellik")]
    public async Task<ActionResult<List<ResultUrunOzellikDto>>> GetOzellikler(Guid urunId, CancellationToken cancellationToken)
    {
        try
        {
            return Ok(await _mediator.Send(new GetUrunOzellikleri.GetUrunOzellikleriQuery(urunId), cancellationToken));
        }
        catch (KeyNotFoundException exception)
        {
            return NotFound(new { message = exception.Message });
        }
    }

    [HttpPost("{urunId:guid}/ozellik")]
    public async Task<IActionResult> CreateOzellik(Guid urunId, [FromBody] CreateUrunOzellikCommand command, CancellationToken cancellationToken)
    {
        if (command.UrunId != urunId)
            return BadRequest(new { message = "İstek gövdesindeki ürün türü kimliği rota kimliğiyle eşleşmelidir." });

        try
        {
            var id = await _mediator.Send(command, cancellationToken);
            return CreatedAtAction(nameof(GetOzellikler), new { urunId }, new { id });
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

    [HttpPut("{urunId:guid}/ozellik/{id:guid}")]
    public async Task<IActionResult> UpdateOzellik(Guid urunId, Guid id, [FromBody] UpdateUrunOzellikCommand command, CancellationToken cancellationToken)
    {
        if (command.UrunId != urunId || command.Id != id)
            return BadRequest(new { message = "İstek gövdesindeki ürün özelliği kimliği rota kimliğiyle eşleşmelidir." });

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

    [HttpDelete("{urunId:guid}/ozellik/{id:guid}")]
    public async Task<IActionResult> DeleteOzellik(Guid urunId, Guid id, CancellationToken cancellationToken)
    {
        try
        {
            await _mediator.Send(new DeleteUrunOzellikCommand(urunId, id), cancellationToken);
            return NoContent();
        }
        catch (KeyNotFoundException exception)
        {
            return NotFound(new { message = exception.Message });
        }
    }
}
