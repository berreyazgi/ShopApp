using FluentValidation;

namespace ShopApp.Application.Features.Urun.Commands.UpdateKategori;

public sealed class UpdateKategoriCommandValidator : AbstractValidator<UpdateKategoriCommand>
{
    public UpdateKategoriCommandValidator()
    {
        RuleFor(x => x.Id).NotEmpty();
        RuleFor(x => x.KategoriAd).NotEmpty();

        RuleFor(x => x.UstKategoriId)
            .NotEqual(Guid.Empty)
            .When(x => x.UstKategoriId.HasValue);
    }
}
