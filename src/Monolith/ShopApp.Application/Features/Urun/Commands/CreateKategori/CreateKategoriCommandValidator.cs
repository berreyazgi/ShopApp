using FluentValidation;

namespace ShopApp.Application.Features.Urun.Commands.CreateKategori;

public sealed class CreateKategoriCommandValidator : AbstractValidator<CreateKategoriCommand>
{
    public CreateKategoriCommandValidator()
    {
        RuleFor(x => x.KategoriAd).NotEmpty();

        RuleFor(x => x.UstKategoriId)
            .NotEqual(Guid.Empty)
            .When(x => x.UstKategoriId.HasValue);
    }
}
