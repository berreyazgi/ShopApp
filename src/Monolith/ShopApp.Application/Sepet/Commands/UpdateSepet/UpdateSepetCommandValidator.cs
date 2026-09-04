using FluentValidation;
using src.Monolith.ShopApp.Domain.Sepet.Enums;

namespace ShopApp.Application.Sepet.Commands.UpdateSepet;

public sealed class UpdateSepetCommandValidator : AbstractValidator<UpdateSepetCommand>
{
    public UpdateSepetCommandValidator()
    {
        RuleFor(x => x.Id).NotEmpty();
        RuleFor(x => x.DurumId)
            .Must(durumId => Enum.IsDefined(typeof(SepetDurum), durumId))
            .WithMessage("Geçerli bir sepet durumu belirtilmelidir.");
    }
}
