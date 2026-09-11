using FluentValidation;

namespace ShopApp.Application.Features.Urun.Commands.DeleteUrunOzellik;

public sealed class DeleteUrunOzellikCommandValidator : AbstractValidator<DeleteUrunOzellikCommand>
{
    public DeleteUrunOzellikCommandValidator()
    {
        RuleFor(x => x.UrunId).NotEmpty();
        RuleFor(x => x.Id).NotEmpty();
    }
}
