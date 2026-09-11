using FluentValidation.TestHelper;
using ShopApp.Application.Features.Sepet.Commands.CreateSepetUrunu;
using ShopApp.Application.Features.Sepet.Commands.UpdateSepet;
using ShopApp.Application.Features.Siparis.Commands.CreateSiparisUrunu;
using ShopApp.Application.Features.Siparis.Commands.UpdateSiparis;
using ShopApp.Application.Features.Urun.Commands.CreateUrunOzellik;
using ShopApp.Application.Features.Urun.Commands.CreateUrunVaryant;
using Xunit;

namespace ShopApp.Application.Tests.Validation;

public class CommandValidatorTests
{
    [Fact]
    public void UpdateSepetCommandValidator_Rejects_UndefinedDurumId()
    {
        var result = new UpdateSepetCommandValidator().TestValidate(new UpdateSepetCommand(Guid.NewGuid(), 999));
        result.ShouldHaveValidationErrorFor(x => x.DurumId);
    }

    [Fact]
    public void UpdateSepetCommandValidator_Accepts_ValidDurumId()
    {
        var result = new UpdateSepetCommandValidator().TestValidate(new UpdateSepetCommand(Guid.NewGuid(), 1));
        result.ShouldNotHaveValidationErrorFor(x => x.DurumId);
    }

    [Fact]
    public void UpdateSiparisCommandValidator_Rejects_UndefinedDurumId()
    {
        var result = new UpdateSiparisCommandValidator().TestValidate(new UpdateSiparisCommand(Guid.NewGuid(), 999));
        result.ShouldHaveValidationErrorFor(x => x.YeniDurumId);
    }

    [Fact]
    public void UpdateSiparisCommandValidator_Accepts_ValidDurumId()
    {
        var result = new UpdateSiparisCommandValidator().TestValidate(new UpdateSiparisCommand(Guid.NewGuid(), 1));
        result.ShouldNotHaveValidationErrorFor(x => x.YeniDurumId);
    }

    [Fact]
    public void CreateSepetUrunuCommandValidator_Rejects_NonPositiveQuantity()
    {
        var result = new CreateSepetUrunuCommandValidator().TestValidate(
            new CreateSepetUrunuCommand(Guid.NewGuid(), Guid.NewGuid(), 0));
        result.ShouldHaveValidationErrorFor(x => x.UrunMiktar);
    }

    [Fact]
    public void CreateSiparisUrunuCommandValidator_Rejects_DiscountOutsideZeroToOneRange()
    {
        var result = new CreateSiparisUrunuCommandValidator().TestValidate(
            new CreateSiparisUrunuCommand(Guid.NewGuid(), Guid.NewGuid(), Guid.NewGuid(), "Ürün", null, null, 1, 10m, 1.5m));
        result.ShouldHaveValidationErrorFor(x => x.IndirimOrani);
    }

    [Fact]
    public void CreateSiparisUrunuCommandValidator_Accepts_ValidCommand()
    {
        var result = new CreateSiparisUrunuCommandValidator().TestValidate(
            new CreateSiparisUrunuCommand(Guid.NewGuid(), Guid.NewGuid(), Guid.NewGuid(), "Ürün", null, null, 1, 10m, 0.1m));
        result.ShouldNotHaveAnyValidationErrors();
    }

    [Fact]
    public void CreateUrunVaryantCommandValidator_Rejects_NegativeStock()
    {
        var result = new CreateUrunVaryantCommandValidator().TestValidate(
            new CreateUrunVaryantCommand(Guid.NewGuid(), "M", "Siyah", -1, "TSHIRT-BLK-M", 0m, true));

        result.ShouldHaveValidationErrorFor(x => x.StokAdet);
    }

    [Fact]
    public void CreateUrunOzellikCommandValidator_Rejects_NegativeDisplayOrder()
    {
        var result = new CreateUrunOzellikCommandValidator().TestValidate(
            new CreateUrunOzellikCommand(Guid.NewGuid(), "Kumaş", "%100 Pamuk", -1));

        result.ShouldHaveValidationErrorFor(x => x.Siralama);
    }
}
