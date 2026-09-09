using MediatR;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Domain.Urun.Entities;

namespace ShopApp.Application.Features.Urun.Commands.DeleteKategori;

public sealed class DeleteKategoriCommandHandler(
    IGenericUrunRepository<Kategori> repository)
    : IRequestHandler<DeleteKategoriCommand>
{
    public async Task Handle(DeleteKategoriCommand request, CancellationToken cancellationToken)
    {
        var kategori = await repository.GetByIdAsync(request.Id, cancellationToken);
        if (kategori is null)
            throw new KeyNotFoundException($"Kategori '{request.Id}' bulunamadı.");

        await repository.DeleteAsync(kategori, cancellationToken);
    }
}
