using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShopApp.Application.Features.Admin.Dashboard.Dtos;
using ShopApp.Application.Features.Admin.Dashboard.Queries;

namespace src.Monolith.ShopApp.Api.Controllers;

[ApiController]
[Route("api/admin/dashboard")]
[Authorize(Roles = "Admin")]
public sealed class AdminDashboardController : ControllerBase
{
    private readonly IMediator _mediator;

    public AdminDashboardController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<ActionResult<AdminDashboardDto>> Get(CancellationToken cancellationToken)
        => Ok(await _mediator.Send(new GetAdminDashboard.GetAdminDashboardQuery(), cancellationToken));
}
