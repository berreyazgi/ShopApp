using FluentValidation;

namespace ShopApp.Application.Features.Urun.Commands.CreateUrunVaryant;

public sealed class CreateUrunVaryantCommandValidator : AbstractValidator<CreateUrunVaryantCommand>
{
    public CreateUrunVaryantCommandValidator()
    {
        RuleFor(x => x.UrunId).NotEmpty();

        RuleFor(x => x.Beden).MaximumLength(50);
        RuleFor(x => x.Renk).MaximumLength(100);

        RuleFor(x => x.StokAdet).GreaterThanOrEqualTo(0);

        RuleFor(x => x.StokKod)
            .NotEmpty()
            .MaximumLength(100);
    }
}
