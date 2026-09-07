using FluentValidation;

namespace ShopApp.Application.Features.Sepet.Commands.UpdateSepetUrunu;

public sealed class UpdateSepetUrunuCommandValidator : AbstractValidator<UpdateSepetUrunuCommand>
{
    public UpdateSepetUrunuCommandValidator()
    {
        RuleFor(x => x.SepetId).NotEmpty();
        RuleFor(x => x.Id).NotEmpty();
        RuleFor(x => x.UrunMiktar).GreaterThan(0);
    }
}
