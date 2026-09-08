using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Application.Features.Adres.Dtos;
using src.Monolith.ShopApp.Domain.Kullanici;

namespace ShopApp.Application.Features.Adres.Commands.UpdateAddress;

public sealed record UpdateAddressCommand(
    Guid Id,
    string? AdresBilgisi,
    int Ulke,
    int Sehir,
    int Ilce,
    string PostaKodu
) : IRequest<AddressDto>;

public sealed class UpdateAddressCommandValidator : AbstractValidator<UpdateAddressCommand>
{
    public UpdateAddressCommandValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty().WithMessage("Adres kimliği zorunludur.");

        RuleFor(x => x.PostaKodu)
            .NotEmpty().WithMessage("Posta kodu zorunludur.")
            .MaximumLength(10).WithMessage("Posta kodu en fazla 10 karakter olabilir.");

        RuleFor(x => x.AdresBilgisi)
            .MaximumLength(5000).WithMessage("Adres bilgisi en fazla 5000 karakter olabilir.");

        RuleFor(x => x.Sehir)
            .GreaterThan(0).WithMessage("Geçerli bir şehir seçiniz.");
    }
}

public sealed class UpdateAddressCommandHandler(
    IShopAppDbContext context,
    ICurrentCustomerContext currentCustomerContext) : IRequestHandler<UpdateAddressCommand, AddressDto>
{
    public async Task<AddressDto> Handle(UpdateAddressCommand request, CancellationToken cancellationToken)
    {
        var customer = await currentCustomerContext.GetRequiredAsync(cancellationToken);

        var address = await context.Adresler
            .FirstOrDefaultAsync(a => a.Id == request.Id && a.MusteriId == customer.MusteriId, cancellationToken)
            ?? throw new KeyNotFoundException("Adres bulunamadı veya bu kullanıcıya ait değil.");

        address.Guncelle(
            ulke: request.Ulke > 0 ? request.Ulke : 90,
            sehir: request.Sehir,
            ilce: request.Ilce,
            postaKodu: request.PostaKodu.Trim(),
            adresBilgisi: request.AdresBilgisi?.Trim(),
            guncelleyenKullaniciId: customer.KullaniciId
        );

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
