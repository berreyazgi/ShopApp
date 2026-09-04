using FluentValidation;
using src.Monolith.ShopApp.Domain.Siparisler.Enums;

namespace ShopApp.Application.Siparis.Commands.UpdateSiparis;

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
