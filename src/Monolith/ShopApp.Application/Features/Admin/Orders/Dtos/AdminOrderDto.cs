namespace ShopApp.Application.Features.Admin.Orders.Dtos;

public sealed record AdminOrderDto(
    Guid Id,
    string OrderNumber,
    Guid MusteriId,
    string CustomerName,
    string? Email,
    DateTime CreatedAt,
    int ItemCount,
    decimal Total,
    int DurumId,
    string Durum
);
