using FluentValidation;

namespace ShopApp.Application.Features.Admin.Customers.Commands.UpdateAdminCustomer;

public sealed class UpdateAdminCustomerCommandValidator : AbstractValidator<UpdateAdminCustomerCommand>
{
    public UpdateAdminCustomerCommandValidator()
    {
        RuleFor(x => x.MusteriId).NotEmpty();

        When(x => x.Ad is not null, () =>
        {
            RuleFor(x => x.Ad!)
                .NotEmpty().WithMessage("Ad boş olamaz.")
                .MaximumLength(100);
        });

        When(x => x.Soyad is not null, () =>
        {
            RuleFor(x => x.Soyad!)
                .NotEmpty().WithMessage("Soyad boş olamaz.")
                .MaximumLength(100);
        });

        // PhoneNumber == null means "not supplied" (leave unchanged); "" means
        // "clear the phone number" (KayitliKullanici.PhoneNumber is nullable) —
        // only a non-empty value is format/length-checked.
        RuleFor(x => x.PhoneNumber!)
            .MaximumLength(30)
            .Matches(@"^[0-9+\s()-]{7,30}$").WithMessage("Geçerli bir telefon numarası girin.")
            .When(x => !string.IsNullOrWhiteSpace(x.PhoneNumber));

        RuleFor(x => x)
            .Must(x => x.Ad is not null || x.Soyad is not null || x.PhoneNumber is not null || x.IsActive is not null)
            .WithMessage("Güncellenecek en az bir alan belirtilmelidir.");
    }
}
