using FluentValidation;

namespace ShopApp.Application.Features.Urun.Commands.UpdateUrun;

public sealed class UpdateUrunCommandValidator : AbstractValidator<UpdateUrunCommand>
{
    public UpdateUrunCommandValidator()
    {
        RuleFor(x => x.Id).NotEmpty();
        RuleFor(x => x.KategoriId).NotEmpty();
        RuleFor(x => x.UrunAd).NotEmpty();
        RuleFor(x => x.MarkaAd).NotEmpty();
        RuleFor(x => x.Fiyat).GreaterThanOrEqualTo(0);
        RuleFor(x => x.GecmisFiyat).GreaterThanOrEqualTo(0);
    }
}
