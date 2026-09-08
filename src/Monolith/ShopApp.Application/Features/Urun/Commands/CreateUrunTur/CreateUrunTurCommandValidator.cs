using FluentValidation;

namespace ShopApp.Application.Features.Urun.Commands.CreateUrunTur;

public sealed class CreateUrunTurCommandValidator : AbstractValidator<CreateUrunTurCommand>
{
    public CreateUrunTurCommandValidator()
    {
        RuleFor(x => x.UrunId).NotEmpty();

        RuleFor(x => x.Ad)
            .NotEmpty()
            .MaximumLength(300);

        RuleFor(x => x.StokAded).GreaterThanOrEqualTo(0);

        RuleFor(x => x.StokKod)
            .NotEmpty()
            .MaximumLength(100);
    }
}
