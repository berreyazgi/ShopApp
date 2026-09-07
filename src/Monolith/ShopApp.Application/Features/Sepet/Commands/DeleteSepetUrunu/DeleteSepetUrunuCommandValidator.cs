using FluentValidation;

namespace ShopApp.Application.Features.Sepet.Commands.DeleteSepetUrunu;

public sealed class DeleteSepetUrunuCommandValidator : AbstractValidator<DeleteSepetUrunuCommand>
{
    public DeleteSepetUrunuCommandValidator()
    {
        RuleFor(x => x.SepetId).NotEmpty();
        RuleFor(x => x.Id).NotEmpty();
    }
}
