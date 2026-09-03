using FluentValidation;

namespace ShopApp.Application.SepetUrunleri.Commands.CreateSepetUrunu;

public sealed class CreateSepetUrunuCommandValidator : AbstractValidator<CreateSepetUrunuCommand>
{
    public CreateSepetUrunuCommandValidator()
    {
        RuleFor(x => x.SepetId).NotEmpty();
        RuleFor(x => x.UrunTurId).NotEmpty();
        RuleFor(x => x.UrunMiktar).GreaterThan(0);
        RuleFor(x => x.UrunAdet).GreaterThan(0);
        RuleFor(x => x.FiyatGecmis).GreaterThanOrEqualTo(0);
    }
}
