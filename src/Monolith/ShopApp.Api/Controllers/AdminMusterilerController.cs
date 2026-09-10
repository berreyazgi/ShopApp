using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShopApp.Application.Features.Admin.Customers.Commands.UpdateAdminCustomer;
using ShopApp.Application.Features.Admin.Customers.Dtos;
using ShopApp.Application.Features.Admin.Customers.Queries;

namespace src.Monolith.ShopApp.Api.Controllers;

[ApiController]
[Route("api/admin/musteriler")]
[Authorize(Roles = "Admin")]
public sealed class AdminMusterilerController : ControllerBase
{
    private readonly IMediator _mediator;

    public AdminMusterilerController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<ActionResult<List<AdminCustomerDto>>> GetAll(CancellationToken cancellationToken)
        => Ok(await _mediator.Send(new GetAdminCustomers.GetAdminCustomersQuery(), cancellationToken));

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateAdminCustomerRequest request, CancellationToken cancellationToken)
    {
        var command = new UpdateAdminCustomerCommand(id, request.Ad, request.Soyad, request.PhoneNumber, request.IsActive);

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
}

/// <summary>
/// Request body for updating a customer — deliberately omits MusteriId: the
/// route {id} is the sole, authoritative identifier, so the frontend never
/// needs to duplicate it in the payload.
/// </summary>
public sealed record UpdateAdminCustomerRequest(string? Ad, string? Soyad, string? PhoneNumber, bool? IsActive);
