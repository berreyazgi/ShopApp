namespace ShopApp.Application.Features.Sepet.Dtos;

public record ResultSepetDto(
    Guid Id,
    Guid MusteriId,
    int DurumId,
    DateTime OlusturmaTarihi
    );