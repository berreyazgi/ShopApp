using MediatR;

namespace ShopApp.Application.Features.Admin.Orders.Commands.UpdateAdminOrderStatus;

/// <summary>One canonical status field — no YeniDurumId/StatusId aliases.</summary>
public sealed record UpdateAdminOrderStatusCommand(Guid Id, int DurumId) : IRequest;
