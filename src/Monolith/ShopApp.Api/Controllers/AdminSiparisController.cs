using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShopApp.Application.Features.Admin.Orders.Commands.UpdateAdminOrderStatus;
using ShopApp.Application.Features.Admin.Orders.Dtos;
using ShopApp.Application.Features.Admin.Orders.Queries;

namespace src.Monolith.ShopApp.Api.Controllers;

[ApiController]
[Route("api/admin/siparisler")]
[Authorize(Roles = "Admin")]
public sealed class AdminSiparisController : ControllerBase
{
    private readonly IMediator _mediator;

    public AdminSiparisController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<ActionResult<List<AdminOrderDto>>> GetAll(CancellationToken cancellationToken)
        => Ok(await _mediator.Send(new GetAdminOrders.GetAdminOrdersQuery(), cancellationToken));

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<AdminOrderDetailDto>> GetById(Guid id, CancellationToken cancellationToken)
    {
        try
        {
            return Ok(await _mediator.Send(new GetAdminOrder.GetAdminOrderQuery(id), cancellationToken));
        }
        catch (KeyNotFoundException exception)
        {
            return NotFound(new { message = exception.Message });
        }
    }

    [HttpPut("{id:guid}/durum")]
    public async Task<IActionResult> UpdateStatus(Guid id, [FromBody] UpdateAdminOrderStatusRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _mediator.Send(new UpdateAdminOrderStatusCommand(id, request.DurumId), cancellationToken);
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
}

public sealed record UpdateAdminOrderStatusRequest(int DurumId);
