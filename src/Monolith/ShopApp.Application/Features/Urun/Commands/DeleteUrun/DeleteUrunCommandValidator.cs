using FluentValidation;

namespace ShopApp.Application.Features.Urun.Commands.DeleteUrun;

public sealed class DeleteUrunCommandValidator : AbstractValidator<DeleteUrunCommand>
{
    public DeleteUrunCommandValidator()
    {
        RuleFor(x => x.Id).NotEmpty();
    }
}
