using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace ShopApp.Infrastructure.Persistence;

/// <summary>
/// Design-time factory used by EF Core CLI tools (dotnet ef migrations add, etc.)
/// This bypasses the need to resolve the full DI container at design time.
/// </summary>
public class ShopAppDbContextFactory : IDesignTimeDbContextFactory<ShopAppDbContext>
{
    public ShopAppDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<ShopAppDbContext>();

        // Use a placeholder connection string for design-time; the real one is
        // supplied at runtime via appsettings / environment variables.
        optionsBuilder.UseNpgsql(
            "Host=localhost;Port=5432;Database=ShopAppDb;Username=postgres;Password=postgres");

        return new ShopAppDbContext(optionsBuilder.Options);
    }
}
