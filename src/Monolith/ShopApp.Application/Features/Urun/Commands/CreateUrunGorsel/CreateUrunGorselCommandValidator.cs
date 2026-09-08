using FluentValidation;

namespace ShopApp.Application.Features.Urun.Commands.CreateUrunGorsel;

public sealed class CreateUrunGorselCommandValidator : AbstractValidator<CreateUrunGorselCommand>
{
    public CreateUrunGorselCommandValidator()
    {
        RuleFor(x => x.UrunId).NotEmpty();
        RuleFor(x => x.GorselUrl).NotEmpty();
        RuleFor(x => x.GorselSira).GreaterThanOrEqualTo(0);
    }
}
