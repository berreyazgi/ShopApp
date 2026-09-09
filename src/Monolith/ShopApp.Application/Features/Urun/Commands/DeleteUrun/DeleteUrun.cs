using MediatR;

namespace ShopApp.Application.Features.Urun.Commands.DeleteUrun;

public sealed record DeleteUrunCommand(Guid Id) : IRequest;
