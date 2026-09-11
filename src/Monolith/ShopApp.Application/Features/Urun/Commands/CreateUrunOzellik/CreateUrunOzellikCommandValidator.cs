using FluentValidation;

namespace ShopApp.Application.Features.Urun.Commands.CreateUrunOzellik;

public sealed class CreateUrunOzellikCommandValidator : AbstractValidator<CreateUrunOzellikCommand>
{
    public CreateUrunOzellikCommandValidator()
    {
        RuleFor(x => x.UrunId).NotEqual(Guid.Empty);

        RuleFor(x => x.OzellikAd)
            .NotEmpty()
            .MaximumLength(200);

        RuleFor(x => x.Deger)
            .NotEmpty()
            .MaximumLength(500);

        RuleFor(x => x.Siralama).GreaterThanOrEqualTo(0);
    }
}
