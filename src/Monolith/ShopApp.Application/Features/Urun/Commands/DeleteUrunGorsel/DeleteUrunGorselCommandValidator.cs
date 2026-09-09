using FluentValidation;

namespace ShopApp.Application.Features.Urun.Commands.DeleteUrunGorsel;

public sealed class DeleteUrunGorselCommandValidator : AbstractValidator<DeleteUrunGorselCommand>
{
    public DeleteUrunGorselCommandValidator()
    {
        RuleFor(x => x.UrunId).NotEmpty();
        RuleFor(x => x.Id).NotEmpty();
    }
}
