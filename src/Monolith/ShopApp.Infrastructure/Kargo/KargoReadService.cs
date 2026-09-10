using System.Net;
using System.Net.Http.Json;
using Microsoft.Extensions.Logging;
using ShopApp.Application.Common.Interfaces;

namespace ShopApp.Infrastructure.Kargo;

/// <summary>
/// HTTP-based implementation of IKargoReadService — calls the separate
/// KargoServis microservice's own read endpoint rather than referencing its
/// KargoDbContext/EF Core types directly, keeping the Monolith's Application
/// layer independent of KargoServis's persistence implementation.
/// </summary>
public sealed class KargoReadService(HttpClient httpClient, ILogger<KargoReadService> logger) : IKargoReadService
{
    public async Task<ShipmentInfoDto?> GetBySiparisIdAsync(Guid siparisId, CancellationToken cancellationToken = default)
    {
        try
        {
            var response = await httpClient.GetAsync($"api/kargo/siparis/{siparisId}", cancellationToken);

            if (response.StatusCode == HttpStatusCode.NotFound)
                return null; // No shipment created yet — the normal, optional case.

            response.EnsureSuccessStatusCode();

            var payload = await response.Content.ReadFromJsonAsync<KargoGonderisiResponse>(cancellationToken);
            if (payload is null)
                return null;

            return new ShipmentInfoDto(
                payload.Durum,
                payload.KargoSirketIsmi,
                payload.TakipNumarasi,
                payload.TahminiTeslimTarihi);
        }
        catch (Exception exception) when (exception is HttpRequestException or TaskCanceledException or InvalidOperationException)
        {
            // KargoServis being unreachable must never break the admin order
            // view — degrade to "no shipment info available", the same as
            // the genuinely-no-shipment-yet case.
            logger.LogWarning(exception, "Kargo servisine erişilemedi (SiparisId: {SiparisId}).", siparisId);
            return null;
        }
    }

    private sealed record KargoGonderisiResponse(
        string KargoSirketIsmi,
        string? TakipNumarasi,
        string Durum,
        DateOnly? TahminiTeslimTarihi);
}
