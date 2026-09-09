using FluentValidation;

namespace ShopApp.Application.Features.Urun.Commands.UpdateUrunOzellik;

public sealed class UpdateUrunOzellikCommandValidator : AbstractValidator<UpdateUrunOzellikCommand>
{
    public UpdateUrunOzellikCommandValidator()
    {
        RuleFor(x => x.UrunTurId).NotEqual(Guid.Empty);
        RuleFor(x => x.Id).NotEmpty();

        RuleFor(x => x.OzellikAd)
            .NotEmpty()
            .MaximumLength(200);

        RuleFor(x => x.OzellikDeger)
            .NotEmpty()
            .MaximumLength(500);
    }
}
