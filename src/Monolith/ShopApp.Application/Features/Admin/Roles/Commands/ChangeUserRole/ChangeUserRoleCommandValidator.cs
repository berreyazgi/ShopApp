using FluentValidation;

namespace ShopApp.Application.Features.Admin.Roles.Commands.ChangeUserRole;

public sealed class ChangeUserRoleCommandValidator : AbstractValidator<ChangeUserRoleCommand>
{
    // The only roles the application understands. Checked here — before
    // anything DB-dependent runs — so an unknown/arbitrary role name is
    // rejected outright and never reaches role-provisioning logic.
    private static readonly string[] AllowedRoles = ["Admin", "User", "Musteri"];

    public ChangeUserRoleCommandValidator()
    {
        RuleFor(x => x.UserId).NotEmpty();

        RuleFor(x => x.Role)
            .NotEmpty().WithMessage("Rol boş olamaz.")
            .Must(role => role is not null && AllowedRoles.Contains(role.Trim(), StringComparer.OrdinalIgnoreCase))
            .WithMessage("Atanabilecek rol Admin, User veya Musteri olmalıdır.");
    }
}
