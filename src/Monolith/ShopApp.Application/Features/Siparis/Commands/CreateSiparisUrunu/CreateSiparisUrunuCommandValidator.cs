using FluentValidation;

namespace ShopApp.Application.Features.Siparis.Commands.CreateSiparisUrunu;

public sealed class CreateSiparisUrunuCommandValidator : AbstractValidator<CreateSiparisUrunuCommand>
{
    public CreateSiparisUrunuCommandValidator()
    {
        RuleFor(x => x.SiparisId).NotEmpty();
        RuleFor(x => x.UrunTurId).NotEmpty();
        RuleFor(x => x.UrunIsmi).NotEmpty().MaximumLength(500);
        RuleFor(x => x.StokTakipNumarasi).MaximumLength(500);
        RuleFor(x => x.UrunMiktar).GreaterThan(0);
        RuleFor(x => x.UrunBirimFiyat).GreaterThanOrEqualTo(0);
        RuleFor(x => x.IndirimOrani).InclusiveBetween(0, 1);
    }
}
