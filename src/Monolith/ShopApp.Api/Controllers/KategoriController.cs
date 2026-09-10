using MediatR;
using Microsoft.AspNetCore.Mvc;
using ShopApp.Application.Features.Urun.Dtos;
using ShopApp.Application.Features.Urun.Queries;

namespace src.Monolith.ShopApp.Api.Controllers;

[ApiController]
[Route("api/kategori")]
[Route("api/categories")]
public sealed class KategoriController : ControllerBase
{
    private readonly IMediator _mediator;

    public KategoriController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<ActionResult<List<ResultKategoriDto>>> GetAll(CancellationToken cancellationToken)
        => Ok(await _mediator.Send(new GetKategoriler.GetKategorilerQuery(), cancellationToken));

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<GetByIdKategoriDto>> GetById(Guid id, CancellationToken cancellationToken)
    {
        try
        {
            return Ok(await _mediator.Send(new GetKategori.GetKategoriQuery(id), cancellationToken));
        }
        catch (KeyNotFoundException exception)
        {
            return NotFound(new { message = exception.Message });
        }
    }
}
