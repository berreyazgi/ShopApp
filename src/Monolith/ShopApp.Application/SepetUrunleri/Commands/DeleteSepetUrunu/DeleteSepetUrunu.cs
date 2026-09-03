using MediatR;

namespace ShopApp.Application.SepetUrunleri.Commands.DeleteSepetUrunu;

public sealed record DeleteSepetUrunuCommand(Guid SepetId, Guid Id) : IRequest;
