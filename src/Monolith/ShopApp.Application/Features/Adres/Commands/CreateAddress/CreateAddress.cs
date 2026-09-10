using FluentValidation;
using MediatR;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Application.Features.Adres.Dtos;
using src.Monolith.ShopApp.Domain.Kullanici;

namespace ShopApp.Application.Features.Adres.Commands.CreateAddress;

public sealed record CreateAddressCommand(
    string? AdresBilgisi,
    int Ulke,
    int Sehir,
    int Ilce,
    int Mahalle,
    int PostaKodu,
    string? Telefon = null
) : IRequest<AddressDto>;

public sealed class CreateAddressCommandValidator : AbstractValidator<CreateAddressCommand>
{
    public CreateAddressCommandValidator()
    {
        RuleFor(x => x.PostaKodu)
            .GreaterThan(0).WithMessage("Geçerli bir posta kodu giriniz.");

        RuleFor(x => x.AdresBilgisi)
            .MaximumLength(5000).WithMessage("Adres bilgisi en fazla 5000 karakter olabilir.");

        RuleFor(x => x.Sehir)
            .GreaterThan(0).WithMessage("Geçerli bir şehir seçiniz.");

        RuleFor(x => x.Mahalle)
            .GreaterThan(0).WithMessage("Geçerli bir mahalle seçiniz.");

        RuleFor(x => x.Telefon)
            .NotEmpty().WithMessage("Telefon numarası zorunludur.")
            .Matches(@"^\+905\d{9}$").WithMessage("Telefon numarası +905XXXXXXXXX biçiminde olmalıdır.");
    }
}

public sealed class CreateAddressCommandHandler(
    IShopAppDbContext context,
    ICurrentCustomerContext currentCustomerContext) : IRequestHandler<CreateAddressCommand, AddressDto>
{
    public async Task<AddressDto> Handle(CreateAddressCommand request, CancellationToken cancellationToken)
    {
        var customer = await currentCustomerContext.GetRequiredAsync(cancellationToken);

        var address = Address.Olustur(
            musteriId: customer.MusteriId,
            ulke: request.Ulke > 0 ? request.Ulke : 90,
            sehir: request.Sehir,
            ilce: request.Ilce,
            mahalle: request.Mahalle,
            postaKodu: request.PostaKodu,
            adresBilgisi: request.AdresBilgisi?.Trim(),
            telefon: request.Telefon?.Trim(),
            olusturanKullaniciId: customer.KullaniciId
        );

        context.Adresler.Add(address);
        await context.SaveChangesAsync(cancellationToken);

        return new AddressDto(
            address.Id,
            address.MusteriId,
            address.AdresBilgisi,
            address.Telefon,
            address.Ulke,
            address.Sehir,
            address.Ilce,
            address.Mahalle,
            address.PostaKodu,
            address.OlusturmaTarihi,
            address.GuncellemeTarihi
        );
    }
}
