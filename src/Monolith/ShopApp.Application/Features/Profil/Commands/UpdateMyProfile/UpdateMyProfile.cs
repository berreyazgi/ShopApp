using FluentValidation;
using MediatR;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Application.Features.Profil.Dtos;
using ShopApp.Application.Features.Profil.Queries.GetMyProfile;

namespace ShopApp.Application.Features.Profil.Commands.UpdateMyProfile;

public sealed record UpdateMyProfileCommand(
    string Ad,
    string Soyad,
    string? Telefon
) : IRequest<UserProfileDto>;

public sealed class UpdateMyProfileCommandValidator : AbstractValidator<UpdateMyProfileCommand>
{
    public UpdateMyProfileCommandValidator()
    {
        RuleFor(x => x.Ad)
            .NotEmpty().WithMessage("Ad alanı zorunludur.")
            .MaximumLength(500).WithMessage("Ad en fazla 500 karakter olabilir.");

        RuleFor(x => x.Soyad)
            .NotEmpty().WithMessage("Soyad alanı zorunludur.")
            .MaximumLength(500).WithMessage("Soyad en fazla 500 karakter olabilir.");

        RuleFor(x => x.Telefon)
            .MaximumLength(50).WithMessage("Telefon en fazla 50 karakter olabilir.")
            .When(x => !string.IsNullOrEmpty(x.Telefon));
    }
}

public sealed class UpdateMyProfileCommandHandler(
    ICurrentCustomerContext currentCustomerContext,
    IIdentityService identityService,
    IMediator mediator) : IRequestHandler<UpdateMyProfileCommand, UserProfileDto>
{
    public async Task<UserProfileDto> Handle(UpdateMyProfileCommand request, CancellationToken cancellationToken)
    {
        var customer = await currentCustomerContext.GetRequiredAsync(cancellationToken);
        await identityService.UpdateProfileAsync(customer.KullaniciId, request.Ad.Trim(), request.Soyad.Trim(), request.Telefon?.Trim());

        return await mediator.Send(new GetMyProfile.GetMyProfileQuery(), cancellationToken);
    }
}
