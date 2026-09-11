using FluentValidation;

namespace ShopApp.Application.Features.Urun.Commands.UpdateUrunVaryant;

public sealed class UpdateUrunVaryantCommandValidator : AbstractValidator<UpdateUrunVaryantCommand>
{
    public UpdateUrunVaryantCommandValidator()
    {
        RuleFor(x => x.UrunId).NotEmpty();
        RuleFor(x => x.Id).NotEmpty();

        RuleFor(x => x.Beden).MaximumLength(50);
        RuleFor(x => x.Renk).MaximumLength(100);

        RuleFor(x => x.StokAdet).GreaterThanOrEqualTo(0);

        RuleFor(x => x.StokKod)
            .NotEmpty()
            .MaximumLength(100);
    }
}
