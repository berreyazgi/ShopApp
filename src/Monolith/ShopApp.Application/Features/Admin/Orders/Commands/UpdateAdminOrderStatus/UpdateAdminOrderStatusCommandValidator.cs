using FluentValidation;

namespace ShopApp.Application.Features.Admin.Orders.Commands.UpdateAdminOrderStatus;

public sealed class UpdateAdminOrderStatusCommandValidator : AbstractValidator<UpdateAdminOrderStatusCommand>
{
    public UpdateAdminOrderStatusCommandValidator()
    {
        RuleFor(x => x.Id).NotEmpty();
        RuleFor(x => x.DurumId).GreaterThan(0);
    }
}
