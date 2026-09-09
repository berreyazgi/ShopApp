using MediatR;

namespace ShopApp.Application.Features.Urun.Commands.UpdateUrunGorsel;

public sealed record UpdateUrunGorselCommand(
    Guid UrunId,
    Guid Id,
    string GorselUrl,
    int GorselSira) : IRequest;
