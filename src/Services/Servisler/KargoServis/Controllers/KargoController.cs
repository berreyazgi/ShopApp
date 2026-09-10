using KargoServis.Infrastructure.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace KargoServis.Controllers;

/// <summary>
/// Smallest read-only endpoint KargoServis needs to expose so the ShopApp
/// Monolith's admin order detail view can enrich an order with its shipment
/// — without the Monolith ever referencing KargoDbContext directly.
/// </summary>
[ApiController]
[Route("api/kargo")]
public sealed class KargoController(KargoDbContext context) : ControllerBase
{
    [HttpGet("siparis/{siparisId:guid}")]
    public async Task<ActionResult<KargoGonderisiResponse>> GetBySiparisId(Guid siparisId, CancellationToken cancellationToken)
    {
        var gonderi = await context.KargoGonderileri
            .AsNoTracking()
            .FirstOrDefaultAsync(k => k.SiparisId == siparisId, cancellationToken);

        if (gonderi is null)
            return NotFound();

        return Ok(new KargoGonderisiResponse(
            gonderi.KargoSirketIsmi,
            gonderi.TakipNumarasi,
            gonderi.Durum.ToString(),
            gonderi.TahminiTeslimTarihi));
    }
}

public sealed record KargoGonderisiResponse(
    string KargoSirketIsmi,
    string? TakipNumarasi,
    string Durum,
    DateOnly? TahminiTeslimTarihi);
