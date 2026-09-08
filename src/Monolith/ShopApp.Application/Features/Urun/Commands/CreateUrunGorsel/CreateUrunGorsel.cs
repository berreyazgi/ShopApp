using MediatR;

namespace ShopApp.Application.Features.Urun.Commands.CreateUrunGorsel;

public sealed record CreateUrunGorselCommand(
    Guid UrunId,
    string GorselUrl,
    int GorselSira) : IRequest<Guid>;
