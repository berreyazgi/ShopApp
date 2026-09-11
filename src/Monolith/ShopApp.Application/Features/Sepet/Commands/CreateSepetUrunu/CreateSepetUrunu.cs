using MediatR;

namespace ShopApp.Application.Features.Sepet.Commands.CreateSepetUrunu;

/// <summary>
/// Price is never accepted from the client — see
/// <see cref="CreateSepetUrunuCommandHandler"/>, which resolves the
/// authoritative price server-side from the UrunVaryant's parent Urun.
/// </summary>
public sealed record CreateSepetUrunuCommand(
    Guid SepetId,
    Guid UrunVaryantId,
    int UrunMiktar) : IRequest<Guid>;
