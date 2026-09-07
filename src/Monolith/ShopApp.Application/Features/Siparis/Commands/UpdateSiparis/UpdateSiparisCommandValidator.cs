using FluentValidation;
using src.Monolith.ShopApp.Domain.Siparis.Enums;

namespace ShopApp.Application.Features.Siparis.Commands.UpdateSiparis;

public sealed class UpdateSiparisCommandValidator : AbstractValidator<UpdateSiparisCommand>
{
    public UpdateSiparisCommandValidator()
    {
        RuleFor(x => x.Id).NotEmpty();
        RuleFor(x => x.YeniDurumId)
            .Must(durumId => Enum.IsDefined(typeof(SiparisDurum), durumId))
            .WithMessage("Geçerli bir sipariş durumu belirtilmelidir.");
    }
}
