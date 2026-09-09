using FluentValidation;

namespace ShopApp.Application.Features.Urun.Commands.DeleteKategori;

public sealed class DeleteKategoriCommandValidator : AbstractValidator<DeleteKategoriCommand>
{
    public DeleteKategoriCommandValidator()
    {
        RuleFor(x => x.Id).NotEmpty();
    }
}
