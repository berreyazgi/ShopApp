using FluentValidation;

namespace ShopApp.Application.Features.Sepet.Commands.CreateSepetUrunu;

public sealed class CreateSepetUrunuCommandValidator : AbstractValidator<CreateSepetUrunuCommand>
{
    public CreateSepetUrunuCommandValidator()
    {
        RuleFor(x => x.SepetId).NotEmpty();
        RuleFor(x => x.UrunVaryantId).NotEmpty();
        RuleFor(x => x.UrunMiktar).GreaterThan(0);
        RuleFor(x => x.UrunMiktar).LessThan(10);
    }
}
