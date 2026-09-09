using FluentValidation;

namespace ShopApp.Application.Features.Urun.Commands.UpdateUrunGorsel;

public sealed class UpdateUrunGorselCommandValidator : AbstractValidator<UpdateUrunGorselCommand>
{
    public UpdateUrunGorselCommandValidator()
    {
        RuleFor(x => x.UrunId).NotEmpty();
        RuleFor(x => x.Id).NotEmpty();
        RuleFor(x => x.GorselUrl).NotEmpty();
        RuleFor(x => x.GorselSira).GreaterThanOrEqualTo(0);
    }
}
