using FluentValidation;

namespace ShopApp.Application.SiparisUrunu.Commands.UpdateSiparisUrunu;

public sealed class UpdateSiparisUrunuCommandValidator : AbstractValidator<UpdateSiparisUrunuCommand>
{
    public UpdateSiparisUrunuCommandValidator()
    {
        RuleFor(x => x.SiparisId).NotEmpty();
        RuleFor(x => x.Id).NotEmpty();
        RuleFor(x => x.UrunMiktar).GreaterThan(0);
    }
}
