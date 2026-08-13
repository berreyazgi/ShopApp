namespace ShopApp.Application.Auth;

public sealed class AuthenticationValidationException : Exception
{
    public AuthenticationValidationException(IEnumerable<string> errors)
        : base("Kayıt bilgileri geçersiz.")
    {
        Errors = errors.Distinct().ToArray();
    }

    public IReadOnlyCollection<string> Errors { get; }
}
