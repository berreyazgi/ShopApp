using FluentValidation;

namespace ShopApp.Application.Features.Urun.Commands.CreateUrun;

public sealed class CreateUrunCommandValidator : AbstractValidator<CreateUrunCommand>
{
    public CreateUrunCommandValidator()
    {
        RuleFor(x => x.KategoriId).NotEmpty();
        RuleFor(x => x.UrunAd).NotEmpty();
        RuleFor(x => x.MarkaAd).NotEmpty();
        RuleFor(x => x.Fiyat).GreaterThanOrEqualTo(0);
        RuleFor(x => x.GecmisFiyat).GreaterThanOrEqualTo(0);
        RuleForEach(x => x.ImageUrls)
            .NotEmpty().WithMessage("Görsel URL boş olamaz.");

        // Mirrors CreateUrunVaryantCommandValidator — only enforced when the
        // caller actually asked for an initial variant (InitialStokKod set).
        RuleFor(x => x.InitialStokKod).MaximumLength(100)
            .When(x => x.InitialStokKod is not null);
        RuleFor(x => x.InitialStokAdet).GreaterThanOrEqualTo(0)
            .When(x => x.InitialStokAdet is not null);
        RuleFor(x => x.InitialBeden).MaximumLength(50)
            .When(x => x.InitialBeden is not null);
        RuleFor(x => x.InitialRenk).MaximumLength(100)
            .When(x => x.InitialRenk is not null);
    }
}
