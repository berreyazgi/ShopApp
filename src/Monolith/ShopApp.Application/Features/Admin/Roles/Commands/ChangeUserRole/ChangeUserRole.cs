using MediatR;

namespace ShopApp.Application.Features.Admin.Roles.Commands.ChangeUserRole;

/// <summary>
/// Replaces (not adds to) the target user's application-managed role. See
/// <see cref="ChangeUserRoleCommandHandler"/> for the last-admin and
/// self-change protections.
/// </summary>
public sealed record ChangeUserRoleCommand(Guid UserId, string Role) : IRequest;
