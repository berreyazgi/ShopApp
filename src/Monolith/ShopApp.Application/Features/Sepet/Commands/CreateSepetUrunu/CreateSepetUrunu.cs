using MediatR;

namespace ShopApp.Application.Features.Sepet.Commands.CreateSepetUrunu;

/// <summary>
/// Price is never accepted from the client — see
/// <see cref="CreateSepetUrunuCommandHandler"/>, which resolves the
/// authoritative price server-side from the UrunTur's parent Urun.
/// </summary>
public sealed record CreateSepetUrunuCommand(
    Guid SepetId,
    Guid UrunTurId,
    int UrunMiktar) : IRequest<Guid>;
