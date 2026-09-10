using ShopApp.Application.Common.Interfaces;

namespace ShopApp.Application.Features.Admin.Orders.Dtos;

public sealed record AdminOrderCustomerDto(
    Guid MusteriId,
    Guid KullaniciId,
    string FullName,
    string Email,
    string? PhoneNumber
);

public sealed record AdminOrderItemDto(
    Guid Id,
    Guid UrunId,
    Guid UrunTurId,
    string UrunIsmi,
    string? UrunAciklamasi,
    string? StokTakipNumarasi,
    int UrunMiktar,
    decimal UrunBirimFiyat,
    decimal IndirimOrani,
    decimal ToplamFiyat
);

/// <summary>
/// Full admin order detail — customer, the persisted order-item snapshots
/// (never live product/price data, since a product may later be renamed,
/// repriced or deleted), totals, status, and an optional shipment. Kept
/// separate from the lightweight AdminOrderDto used by the list endpoint.
/// </summary>
public sealed record AdminOrderDetailDto(
    Guid Id,
    string OrderNumber,
    DateTime CreatedAt,
    AdminOrderCustomerDto Customer,
    List<AdminOrderItemDto> Items,
    decimal AraToplam,
    decimal IndirimTutari,
    decimal KargoFiyat,
    decimal ToplamFiyat,
    int DurumId,
    string Durum,
    ShipmentInfoDto? Shipment
);
