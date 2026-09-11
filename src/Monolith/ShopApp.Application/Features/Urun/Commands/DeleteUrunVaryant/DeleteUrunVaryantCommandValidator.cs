using FluentValidation;

namespace ShopApp.Application.Features.Urun.Commands.DeleteUrunVaryant;

public sealed class DeleteUrunVaryantCommandValidator : AbstractValidator<DeleteUrunVaryantCommand>
{
    public DeleteUrunVaryantCommandValidator()
    {
        RuleFor(x => x.UrunId).NotEmpty();
        RuleFor(x => x.Id).NotEmpty();
    }
}
