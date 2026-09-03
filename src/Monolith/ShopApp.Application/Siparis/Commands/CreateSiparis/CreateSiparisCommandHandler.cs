using System.ComponentModel.DataAnnotations;

namespace ShopApp.Application.Siparis.Commands.CreateSiparis;

public class CreateSiparisCommandHandler
{
    public static List<ValidationResult> Validate(CreateSiparis.Command command)
    {
        var results = new List<ValidationResult>();

        if (command.MusteriId == Guid.Empty)
        {
            results.Add(new ValidationResult(
                "MusteriId alanı zorunludur.",
                [nameof(command.MusteriId)]));
        }


        return results;
    }
}