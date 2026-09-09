using MediatR;

namespace ShopApp.Application.Features.Admin.Customers.Commands.UpdateAdminCustomer;

/// <summary>
/// MusteriId is the one, unambiguous identifier for this operation — it is
/// never re-interpreted as an Identity user id. The handler resolves
/// Musteri → Musteri.KullaniciId → KayitliKullanici, so this command can
/// never reach an Identity account that has no Musteri record (e.g. an
/// Admin-only account).
/// </summary>
public sealed record UpdateAdminCustomerCommand(
    Guid MusteriId,
    string? Ad,
    string? Soyad,
    string? PhoneNumber,
    bool? IsActive) : IRequest;
