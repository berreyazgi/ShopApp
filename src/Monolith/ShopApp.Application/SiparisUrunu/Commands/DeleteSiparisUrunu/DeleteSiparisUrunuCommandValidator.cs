using FluentValidation;

namespace ShopApp.Application.SiparisUrunu.Commands.DeleteSiparisUrunu;

public sealed class DeleteSiparisUrunuCommandValidator : AbstractValidator<DeleteSiparisUrunuCommand>
{
    public DeleteSiparisUrunuCommandValidator()
    {
        RuleFor(x => x.SiparisId).NotEmpty();
        RuleFor(x => x.Id).NotEmpty();
    }
}
