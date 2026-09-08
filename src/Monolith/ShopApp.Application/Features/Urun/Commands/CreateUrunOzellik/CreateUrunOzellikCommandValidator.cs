using FluentValidation;

namespace ShopApp.Application.Features.Urun.Commands.CreateUrunOzellik;

public sealed class CreateUrunOzellikCommandValidator : AbstractValidator<CreateUrunOzellikCommand>
{
    public CreateUrunOzellikCommandValidator()
    {
        RuleFor(x => x.UrunTurId).NotEqual(Guid.Empty);

        RuleFor(x => x.OzellikAd)
            .NotEmpty()
            .MaximumLength(200);

        RuleFor(x => x.OzellikDeger)
            .NotEmpty()
            .MaximumLength(500);
    }
}
