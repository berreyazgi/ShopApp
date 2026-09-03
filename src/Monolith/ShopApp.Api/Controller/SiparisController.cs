using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShopApp.Application.Dtos.SiparisDtos;
using ShopApp.Application.Dtos.SiparisUrunleriDto;
using ShopApp.Application.Siparis.Commands.CreateSiparis;
using ShopApp.Application.Siparis.Commands.DeleteSiparis;
using ShopApp.Application.Siparis.Commands.UpdateSiparis;
using ShopApp.Application.Siparis.Queries;
using ShopApp.Application.SiparisUrunu.Commands.CreateSiparisUrunu;
using ShopApp.Application.SiparisUrunu.Commands.DeleteSiparisUrunu;
using ShopApp.Application.SiparisUrunu.Commands.UpdateSiparisUrunu;
using ShopApp.Application.SiparisUrunu.Queries;

namespace src.Monolith.ShopApp.Api.Controller;

[Authorize]
[ApiController]
[Route("api/siparis")]
public sealed class SiparisController : ControllerBase
{
    private readonly IMediator _mediator;

    public SiparisController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<ActionResult<List<ResultSiparisDto>>> GetAll(CancellationToken cancellationToken)
        => Ok(await _mediator.Send(new GetMySiparisler.GetMySiparislerQuery(), cancellationToken));

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ResultSiparisDto>> GetById(Guid id, CancellationToken cancellationToken)
    {
        try
        {
            return Ok(await _mediator.Send(new GetSiparis.GetSiparisQuery { Id = id }, cancellationToken));
        }
        catch (KeyNotFoundException exception)
        {
            return NotFound(new { message = exception.Message });
        }
    }

    [HttpPost]
    public async Task<IActionResult> Create(CancellationToken cancellationToken)
    {
        var id = await _mediator.Send(new CreateSiparisCommand(), cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id }, new { id });
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateSiparisCommand command, CancellationToken cancellationToken)
    {
        if (command.Id != id)
            return BadRequest(new { message = "İstek gövdesindeki sipariş kimliği rota kimliğiyle eşleşmelidir." });

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
            return BadRequest(new { errors = exception.Errors.Select(e => new { field = e.PropertyName, message = e.ErrorMessage }) });
        }
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        try
        {
            await _mediator.Send(new DeleteSiparisCommand(id), cancellationToken);
            return NoContent();
        }
        catch (KeyNotFoundException exception)
        {
            return NotFound(new { message = exception.Message });
        }
    }

    [HttpGet("{siparisId:guid}/urunler")]
    public async Task<ActionResult<List<ResultSiparisUrunleriDto>>> GetUrunler(Guid siparisId, CancellationToken cancellationToken)
    {
        try
        {
            return Ok(await _mediator.Send(new GetSiparisUrunleri.GetSiparisUrunleriQuery(siparisId), cancellationToken));
        }
        catch (KeyNotFoundException exception)
        {
            return NotFound(new { message = exception.Message });
        }
    }

    [HttpGet("{siparisId:guid}/urunler/{urunId:guid}")]
    public async Task<ActionResult<ResultSiparisUrunleriDto>> GetUrunById(Guid siparisId, Guid urunId, CancellationToken cancellationToken)
    {
        try
        {
            return Ok(await _mediator.Send(new GetSiparisUrunu.GetSiparisUrunuQuery(siparisId, urunId), cancellationToken));
        }
        catch (KeyNotFoundException exception)
        {
            return NotFound(new { message = exception.Message });
        }
    }

    [HttpPost("{siparisId:guid}/urunler")]
    public async Task<IActionResult> CreateUrun(Guid siparisId, [FromBody] CreateSiparisUrunuCommand command, CancellationToken cancellationToken)
    {
        if (command.SiparisId != siparisId)
            return BadRequest(new { message = "İstek gövdesindeki sipariş kimliği rota kimliğiyle eşleşmelidir." });

        try
        {
            var id = await _mediator.Send(command, cancellationToken);
            return CreatedAtAction(nameof(GetUrunById), new { siparisId, urunId = id }, new { id });
        }
        catch (KeyNotFoundException exception)
        {
            return NotFound(new { message = exception.Message });
        }
        catch (ValidationException exception)
        {
            return BadRequest(new { errors = exception.Errors.Select(e => new { field = e.PropertyName, message = e.ErrorMessage }) });
        }
    }

    [HttpPut("{siparisId:guid}/urunler/{urunId:guid}")]
    public async Task<IActionResult> UpdateUrun(Guid siparisId, Guid urunId, [FromBody] UpdateSiparisUrunuCommand command, CancellationToken cancellationToken)
    {
        if (command.Id != urunId || command.SiparisId != siparisId)
            return BadRequest(new { message = "İstek gövdesindeki ürün veya sipariş kimliği rota kimliğiyle eşleşmelidir." });

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
            return BadRequest(new { errors = exception.Errors.Select(e => new { field = e.PropertyName, message = e.ErrorMessage }) });
        }
    }

    [HttpDelete("{siparisId:guid}/urunler/{urunId:guid}")]
    public async Task<IActionResult> DeleteUrun(Guid siparisId, Guid urunId, CancellationToken cancellationToken)
    {
        try
        {
            await _mediator.Send(new DeleteSiparisUrunuCommand(siparisId, urunId), cancellationToken);
            return NoContent();
        }
        catch (KeyNotFoundException exception)
        {
            return NotFound(new { message = exception.Message });
        }
    }
}
