using FluentValidation;

namespace ShopApp.Application.Features.Siparis.Commands.CreateSiparisUrunu;

public sealed class CreateSiparisUrunuCommandValidator : AbstractValidator<CreateSiparisUrunuCommand>
{
    public CreateSiparisUrunuCommandValidator()
    {
        RuleFor(x => x.SiparisId).NotEmpty();
        RuleFor(x => x.UrunId).NotEmpty();
        RuleFor(x => x.UrunVaryantId).NotEmpty();
        RuleFor(x => x.UrunIsmi).NotEmpty().MaximumLength(500);
        RuleFor(x => x.StokTakipNumarasi).MaximumLength(500);
        RuleFor(x => x.Beden).MaximumLength(50);
        RuleFor(x => x.Renk).MaximumLength(100);
        RuleFor(x => x.UrunMiktar).GreaterThan(0);
        RuleFor(x => x.UrunBirimFiyat).GreaterThanOrEqualTo(0);
        RuleFor(x => x.IndirimOrani).InclusiveBetween(0, 1);
    }
}
