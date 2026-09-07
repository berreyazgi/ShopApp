using MediatR;

namespace ShopApp.Application.Features.Sepet.Commands.DeleteSepetUrunu;

public sealed record DeleteSepetUrunuCommand(Guid SepetId, Guid Id) : IRequest;
