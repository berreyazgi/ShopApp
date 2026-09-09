using FluentValidation;

namespace ShopApp.Application.Features.Urun.Commands.UpdateUrunTur;

public sealed class UpdateUrunTurCommandValidator : AbstractValidator<UpdateUrunTurCommand>
{
    public UpdateUrunTurCommandValidator()
    {
        RuleFor(x => x.UrunId).NotEmpty();
        RuleFor(x => x.Id).NotEmpty();

        RuleFor(x => x.Ad)
            .NotEmpty()
            .MaximumLength(300);

        RuleFor(x => x.StokAded).GreaterThanOrEqualTo(0);

        RuleFor(x => x.StokKod)
            .NotEmpty()
            .MaximumLength(100);
    }
}
