using MediatR;
using Microsoft.AspNetCore.Mvc;
using ShopApp.Application.Features.Urun.Dtos;
using ShopApp.Application.Features.Urun.Queries;

namespace src.Monolith.ShopApp.Api.Controllers;

[ApiController]
[Route("api/urun")]
public sealed class UrunController : ControllerBase
{
    private readonly IMediator _mediator;

    public UrunController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<ActionResult<List<ResultUrunDto>>> GetAll([FromQuery] Guid? kategoriId, CancellationToken cancellationToken)
        => Ok(await _mediator.Send(new GetUrunler.GetUrunlerQuery(kategoriId), cancellationToken));

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<GetByIdUrunDto>> GetById(Guid id, CancellationToken cancellationToken)
    {
        try
        {
            return Ok(await _mediator.Send(new GetUrun.GetUrunQuery(id), cancellationToken));
        }
        catch (KeyNotFoundException exception)
        {
            return NotFound(new { message = exception.Message });
        }
    }
}
