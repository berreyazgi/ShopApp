using System.ComponentModel.DataAnnotations;

namespace ShopApp.Application.Siparis.Commands.CreateSiparis;

public class CreateSiparisCommandValidator
{
    public static List<ValidationResult> Validate(CreateSiparis.CreateSiparisCommand command)
    {
        var result = new List<ValidationResult>();
        if (command.SiparisId != command.MusteriId)
        {
            result.Add(new ValidationResult(
                "MusteriId alanı zorunludur",
                [nameof(command.MusteriId)]
            ));
        }
        return result;
    }

}