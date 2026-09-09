using MediatR;
using Microsoft.EntityFrameworkCore;
using ShopApp.Application.Common.Interfaces;

namespace ShopApp.Application.Features.Urun.Commands.DeleteKategori;

public sealed class DeleteKategoriCommandHandler(
    IShopAppDbContext context)
    : IRequestHandler<DeleteKategoriCommand>
{
    public async Task Handle(DeleteKategoriCommand request, CancellationToken cancellationToken)
    {
        var kategori = await context.Kategori
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken)
            ?? throw new KeyNotFoundException($"Kategori '{request.Id}' bulunamadı.");

        var hasAltKategori = await context.Kategori
            .AnyAsync(x => x.UstKategoriId == request.Id, cancellationToken);
        if (hasAltKategori)
            throw new InvalidOperationException($"Kategori '{request.Id}' alt kategorilere sahip olduğu için silinemez.");

        var hasUrun = await context.Urun
            .AnyAsync(x => x.KategoriId == request.Id, cancellationToken);
        if (hasUrun)
            throw new InvalidOperationException($"Kategori '{request.Id}' kendisine bağlı ürünler olduğu için silinemez.");

        context.Kategori.Remove(kategori);
        await context.SaveChangesAsync(cancellationToken);
    }
}
