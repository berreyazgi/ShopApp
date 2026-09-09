using MediatR;

namespace ShopApp.Application.Features.Urun.Commands.DeleteKategori;

public sealed record DeleteKategoriCommand(Guid Id) : IRequest;
