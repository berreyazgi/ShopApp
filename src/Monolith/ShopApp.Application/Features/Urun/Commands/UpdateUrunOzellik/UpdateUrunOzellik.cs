using MediatR;

namespace ShopApp.Application.Features.Urun.Commands.UpdateUrunOzellik;

public sealed record UpdateUrunOzellikCommand(
    Guid UrunId,
    Guid Id,
    string OzellikAd,
    string Deger,
    int Siralama = 0) : IRequest;
