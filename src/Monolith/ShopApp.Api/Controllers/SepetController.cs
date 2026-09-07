using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShopApp.Application.Features.Sepet.Dtos;
using ShopApp.Application.Features.Sepet.Dtos;
using ShopApp.Application.Features.Sepet.Commands.CreateSepet;
using ShopApp.Application.Features.Sepet.Commands.DeleteSepet;
using ShopApp.Application.Features.Sepet.Commands.UpdateSepet;
using ShopApp.Application.Features.Sepet.Queries;
using ShopApp.Application.Features.Sepet.Commands.CreateSepetUrunu;
using ShopApp.Application.Features.Sepet.Commands.DeleteSepetUrunu;
using ShopApp.Application.Features.Sepet.Commands.UpdateSepetUrunu;
using ShopApp.Application.Features.Sepet.Queries;

namespace src.Monolith.ShopApp.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/sepet")]
public sealed class SepetController : ControllerBase
{
    private readonly IMediator _mediator;

    public SepetController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<ActionResult<List<ResultSepetDto>>> GetAll(CancellationToken cancellationToken)
        => Ok(await _mediator.Send(new GetMySepetler.GetMySepetlerQuery(), cancellationToken));

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ResultSepetDto>> GetById(Guid id, CancellationToken cancellationToken)
    {
        try
        {
            return Ok(await _mediator.Send(new GetSepet.GetSepetQuery { Id = id }, cancellationToken));
        }
        catch (KeyNotFoundException exception)
        {
            return NotFound(new { message = exception.Message });
        }
    }

    [HttpPost]
    public async Task<IActionResult> Create(CancellationToken cancellationToken)
    {
        var id = await _mediator.Send(new CreateSepetCommand(), cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id }, new { id });
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateSepetCommand command, CancellationToken cancellationToken)
    {
        if (command.Id != id)
            return BadRequest(new { message = "İstek gövdesindeki sepet kimliği rota kimliğiyle eşleşmelidir." });

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
            await _mediator.Send(new DeleteSepetCommand(id), cancellationToken);
            return NoContent();
        }
        catch (KeyNotFoundException exception)
        {
            return NotFound(new { message = exception.Message });
        }
    }

    [HttpGet("{sepetId:guid}/urunler")]
    public async Task<ActionResult<List<ResultSepetUrunDto>>> GetUrunler(Guid sepetId, CancellationToken cancellationToken)
    {
        try
        {
            return Ok(await _mediator.Send(new GetSepetUrunleri.GetSepetUrunleriQuery(sepetId), cancellationToken));
        }
        catch (KeyNotFoundException exception)
        {
            return NotFound(new { message = exception.Message });
        }
    }

    [HttpGet("{sepetId:guid}/urunler/{urunId:guid}")]
    public async Task<ActionResult<ResultSepetUrunDto>> GetUrunById(Guid sepetId, Guid urunId, CancellationToken cancellationToken)
    {
        try
        {
            return Ok(await _mediator.Send(new GetSepetUrunu.GetSepetUrunuQuery(sepetId, urunId), cancellationToken));
        }
        catch (KeyNotFoundException exception)
        {
            return NotFound(new { message = exception.Message });
        }
    }

    [HttpPost("{sepetId:guid}/urunler")]
    public async Task<IActionResult> CreateUrun(Guid sepetId, [FromBody] CreateSepetUrunuCommand command, CancellationToken cancellationToken)
    {
        if (command.SepetId != sepetId)
            return BadRequest(new { message = "İstek gövdesindeki sepet kimliği rota kimliğiyle eşleşmelidir." });

        try
        {
            var id = await _mediator.Send(command, cancellationToken);
            return CreatedAtAction(nameof(GetUrunById), new { sepetId, urunId = id }, new { id });
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

    [HttpPut("{sepetId:guid}/urunler/{urunId:guid}")]
    public async Task<IActionResult> UpdateUrun(Guid sepetId, Guid urunId, [FromBody] UpdateSepetUrunuCommand command, CancellationToken cancellationToken)
    {
        if (command.Id != urunId || command.SepetId != sepetId)
            return BadRequest(new { message = "İstek gövdesindeki ürün veya sepet kimliği rota kimliğiyle eşleşmelidir." });

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

    [HttpDelete("{sepetId:guid}/urunler/{urunId:guid}")]
    public async Task<IActionResult> DeleteUrun(Guid sepetId, Guid urunId, CancellationToken cancellationToken)
    {
        try
        {
            await _mediator.Send(new DeleteSepetUrunuCommand(sepetId, urunId), cancellationToken);
            return NoContent();
        }
        catch (KeyNotFoundException exception)
        {
            return NotFound(new { message = exception.Message });
        }
    }
}
