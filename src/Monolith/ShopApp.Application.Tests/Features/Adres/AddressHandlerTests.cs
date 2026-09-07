using FluentValidation.TestHelper;
using ShopApp.Application.Common.Interfaces;
using ShopApp.Application.Features.Adres.Commands.CreateAddress;
using ShopApp.Application.Features.Adres.Commands.DeleteAddress;
using ShopApp.Application.Features.Adres.Commands.UpdateAddress;
using ShopApp.Application.Features.Adres.Queries.GetMyAddresses;
using ShopApp.Application.Tests.TestSupport;
using src.Monolith.ShopApp.Domain.Kullanici;
using Xunit;

namespace ShopApp.Application.Tests.Features.Adres;

public class AddressHandlerTests
{
    [Fact]
    public async Task GetMyAddresses_ReturnsOnlyCurrentCustomerAddresses()
    {
        using var context = TestDbContext.Create();
        var myMusteriId = Guid.NewGuid();
        var myUserId = Guid.NewGuid();
        var otherMusteriId = Guid.NewGuid();

        var myAddress1 = Address.Olustur(myMusteriId, 90, 34, 1, "34000", "Kadıköy Mah.", myUserId);
        var myAddress2 = Address.Olustur(myMusteriId, 90, 6, 2, "06000", "Çankaya Mah.", myUserId);
        var otherAddress = Address.Olustur(otherMusteriId, 90, 35, 3, "35000", "Konak Mah.", Guid.NewGuid());

        context.Adresler.AddRange(myAddress1, myAddress2, otherAddress);
        await context.SaveChangesAsync();

        var customer = new CurrentCustomer(myMusteriId, myUserId);
        var customerContext = CustomerContextFactory.For(customer);
        var handler = new GetMyAddresses.GetMyAddressesQueryHandler(context, customerContext.Object);

        var result = await handler.Handle(new GetMyAddresses.GetMyAddressesQuery(), CancellationToken.None);

        Assert.Equal(2, result.Count);
        Assert.All(result, a => Assert.Equal(myMusteriId, a.MusteriId));
    }

    [Fact]
    public async Task CreateAddress_CreatesAndPersistsAddressForCurrentCustomer()
    {
        using var context = TestDbContext.Create();
        var myMusteriId = Guid.NewGuid();
        var myUserId = Guid.NewGuid();
        var customer = new CurrentCustomer(myMusteriId, myUserId);
        var customerContext = CustomerContextFactory.For(customer);

        var handler = new CreateAddressCommandHandler(context, customerContext.Object);
        var command = new CreateAddressCommand("Atatürk Cad. No: 10", 90, 34, 5, "34100");

        var result = await handler.Handle(command, CancellationToken.None);

        Assert.NotNull(result);
        Assert.Equal(myMusteriId, result.MusteriId);
        Assert.Equal(34, result.Sehir);
        Assert.Equal("34100", result.PostaKodu);
        Assert.Equal("Atatürk Cad. No: 10", result.AdresBilgisi);

        var saved = await context.Adresler.FindAsync(result.Id);
        Assert.NotNull(saved);
        Assert.Equal(myMusteriId, saved.MusteriId);
    }

    [Fact]
    public async Task UpdateAddress_UpdatesAddress_WhenOwnedByCustomer()
    {
        using var context = TestDbContext.Create();
        var myMusteriId = Guid.NewGuid();
        var myUserId = Guid.NewGuid();
        var address = Address.Olustur(myMusteriId, 90, 34, 1, "34000", "Eski Adres", myUserId);
        context.Adresler.Add(address);
        await context.SaveChangesAsync();

        var customer = new CurrentCustomer(myMusteriId, myUserId);
        var customerContext = CustomerContextFactory.For(customer);

        var handler = new UpdateAddressCommandHandler(context, customerContext.Object);
        var command = new UpdateAddressCommand(address.Id, "Yeni Adres Bilgisi", 90, 6, 2, "06100");

        var result = await handler.Handle(command, CancellationToken.None);

        Assert.Equal("Yeni Adres Bilgisi", result.AdresBilgisi);
        Assert.Equal(6, result.Sehir);
        Assert.Equal("06100", result.PostaKodu);
    }

    [Fact]
    public async Task UpdateAddress_ThrowsKeyNotFoundException_WhenAddressBelongsToOtherCustomer()
    {
        using var context = TestDbContext.Create();
        var otherMusteriId = Guid.NewGuid();
        var address = Address.Olustur(otherMusteriId, 90, 34, 1, "34000", "Başka Kullanıcı Adresi", Guid.NewGuid());
        context.Adresler.Add(address);
        await context.SaveChangesAsync();

        var myMusteriId = Guid.NewGuid();
        var customer = new CurrentCustomer(myMusteriId, Guid.NewGuid());
        var customerContext = CustomerContextFactory.For(customer);

        var handler = new UpdateAddressCommandHandler(context, customerContext.Object);
        var command = new UpdateAddressCommand(address.Id, "Saldırı Girişimi", 90, 6, 2, "06100");

        await Assert.ThrowsAsync<KeyNotFoundException>(() =>
            handler.Handle(command, CancellationToken.None));
    }

    [Fact]
    public async Task DeleteAddress_DeletesAddress_WhenOwnedByCustomer()
    {
        using var context = TestDbContext.Create();
        var myMusteriId = Guid.NewGuid();
        var myUserId = Guid.NewGuid();
        var address = Address.Olustur(myMusteriId, 90, 34, 1, "34000", "Silinecek Adres", myUserId);
        context.Adresler.Add(address);
        await context.SaveChangesAsync();

        var customer = new CurrentCustomer(myMusteriId, myUserId);
        var customerContext = CustomerContextFactory.For(customer);

        var handler = new DeleteAddressCommandHandler(context, customerContext.Object);
        await handler.Handle(new DeleteAddressCommand(address.Id), CancellationToken.None);

        var deleted = await context.Adresler.FindAsync(address.Id);
        Assert.Null(deleted);
    }

    [Fact]
    public async Task DeleteAddress_ThrowsKeyNotFoundException_WhenAddressBelongsToOtherCustomer()
    {
        using var context = TestDbContext.Create();
        var otherMusteriId = Guid.NewGuid();
        var address = Address.Olustur(otherMusteriId, 90, 34, 1, "34000", "Başka Kullanıcı Adresi", Guid.NewGuid());
        context.Adresler.Add(address);
        await context.SaveChangesAsync();

        var myMusteriId = Guid.NewGuid();
        var customer = new CurrentCustomer(myMusteriId, Guid.NewGuid());
        var customerContext = CustomerContextFactory.For(customer);

        var handler = new DeleteAddressCommandHandler(context, customerContext.Object);

        await Assert.ThrowsAsync<KeyNotFoundException>(() =>
            handler.Handle(new DeleteAddressCommand(address.Id), CancellationToken.None));
    }
}
