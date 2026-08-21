using System.ComponentModel.DataAnnotations;

namespace ShopApp.Application.Sepet.Commands.CreateSepet;

public class CreateSepetCommandValidator
{
    public static List<ValidationResult> Validate(CreateSepet.CreateSepetCommand command)
    {
        var results = new List<ValidationResult>();

        if (string.IsNullOrWhiteSpace(command.MusteriId))
        {
            results.Add(new ValidationResult(
                "MusteriId alanı zorunludur.",
                [nameof(command.MusteriId)]));
        }
        else if (command.MusteriId.Length > 500)
        {
            results.Add(new ValidationResult(
                "MusteriId en fazla 500 karakter olabilir.",
                [nameof(command.MusteriId)]));
        }

        if (command.OlusturanKullaniciId == Guid.Empty)
        {
            results.Add(new ValidationResult(
                "OlusturanKullaniciId alanı zorunludur.",
                [nameof(command.OlusturanKullaniciId)]));
        }
        return results;
    }
}