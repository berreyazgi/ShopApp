namespace ShopApp.Application.Common.Interfaces;

/// <summary>
/// Shipment snapshot for one order, sourced from the separate KargoServis
/// microservice's KargoGonderisi (one row per Siparis, never per line item).
/// </summary>
public sealed record ShipmentInfoDto(
    string Status,
    string? CarrierName,
    string? TrackingNumber,
    DateOnly? EstimatedDeliveryDate);

/// <summary>
/// Read-only boundary onto the KargoServis microservice. Implemented in
/// Infrastructure via an HTTP client — the Application/Domain layers never
/// reference KargoServis's own DbContext or EF Core types directly.
/// </summary>
public interface IKargoReadService
{
    /// <summary>
    /// Returns the shipment for the given order, or null when no shipment has
    /// been created yet (an order can exist before a KargoGonderisi does) or
    /// when the shipment service cannot currently be reached.
    /// </summary>
    Task<ShipmentInfoDto?> GetBySiparisIdAsync(Guid siparisId, CancellationToken cancellationToken = default);
}
