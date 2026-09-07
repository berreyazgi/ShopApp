using FluentValidation;

namespace ShopApp.Application.Features.Siparis.Commands.DeleteSiparis;

public sealed class DeleteSiparisCommandValidator : AbstractValidator<DeleteSiparisCommand>
{
    public DeleteSiparisCommandValidator()
    {
        RuleFor(x => x.Id).NotEmpty();
    }
}
