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
    string PostaKodu
) : IRequest<AddressDto>;

public sealed class CreateAddressCommandValidator : AbstractValidator<CreateAddressCommand>
{
    public CreateAddressCommandValidator()
    {
        RuleFor(x => x.PostaKodu)
            .NotEmpty().WithMessage("Posta kodu zorunludur.")
            .MaximumLength(10).WithMessage("Posta kodu en fazla 10 karakter olabilir.");

        RuleFor(x => x.AdresBilgisi)
            .MaximumLength(5000).WithMessage("Adres bilgisi en fazla 5000 karakter olabilir.");

        RuleFor(x => x.Sehir)
            .GreaterThan(0).WithMessage("Geçerli bir şehir seçiniz.");
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
            postaKodu: request.PostaKodu.Trim(),
            adresBilgisi: request.AdresBilgisi?.Trim(),
            olusturanKullaniciId: customer.KullaniciId
        );

        context.Adresler.Add(address);
        await context.SaveChangesAsync(cancellationToken);

        return new AddressDto(
            address.Id,
            address.MusteriId,
            address.AdresBilgisi,
            address.Ulke,
            address.Sehir,
            address.Ilce,
            address.PostaKodu,
            address.OlusturmaTarihi,
            address.GuncellemeTarihi
        );
    }
}
