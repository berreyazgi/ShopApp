using MediatR;

namespace ShopApp.Application.Features.Urun.Commands.CreateUrunOzellik;

public sealed record CreateUrunOzellikCommand(
    Guid UrunId,
    string OzellikAd,
    string Deger,
    int Siralama = 0) : IRequest<Guid>;
