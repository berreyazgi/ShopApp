using FluentValidation;

namespace ShopApp.Application.Features.Urun.Commands.DeleteUrunTur;

public sealed class DeleteUrunTurCommandValidator : AbstractValidator<DeleteUrunTurCommand>
{
    public DeleteUrunTurCommandValidator()
    {
        RuleFor(x => x.UrunId).NotEmpty();
        RuleFor(x => x.Id).NotEmpty();
    }
}
