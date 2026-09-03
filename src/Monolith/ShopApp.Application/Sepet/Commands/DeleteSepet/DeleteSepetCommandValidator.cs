using FluentValidation;

namespace ShopApp.Application.Sepet.Commands.DeleteSepet;

public sealed class DeleteSepetCommandValidator : AbstractValidator<DeleteSepetCommand>
{
    public DeleteSepetCommandValidator()
    {
        RuleFor(x => x.Id).NotEmpty();
    }
}
