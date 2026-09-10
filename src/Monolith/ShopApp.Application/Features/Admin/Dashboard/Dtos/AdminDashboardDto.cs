namespace ShopApp.Application.Features.Admin.Dashboard.Dtos;

public sealed record AdminDashboardOrderDto(
    Guid Id,
    string OrderNumber,
    string CustomerName,
    decimal Total,
    string Durum,
    DateTime CreatedAt
);

public sealed record AdminLowStockItemDto(
    Guid UrunId,
    Guid UrunTurId,
    string UrunAd,
    string UrunTurAd,
    int StokAded
);

public sealed record AdminDashboardDto(
    int TotalProducts,
    int TotalCategories,
    int PendingOrders,
    int LowStockCount,
    List<AdminDashboardOrderDto> RecentOrders,
    List<AdminLowStockItemDto> LowStockProducts
);
