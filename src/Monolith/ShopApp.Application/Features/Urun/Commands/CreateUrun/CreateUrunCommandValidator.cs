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
    }
}
