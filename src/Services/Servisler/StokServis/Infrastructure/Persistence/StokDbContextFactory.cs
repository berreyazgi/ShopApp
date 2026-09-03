using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace StokServis.Infrastructure.Persistence;

/// <summary>
/// Design-time factory used by EF Core CLI tools (dotnet ef migrations add, database update, etc.)
/// </summary>
public class StokDbContextFactory : IDesignTimeDbContextFactory<StokDbContext>
{
    public StokDbContext CreateDbContext(string[] args)
    {
        var configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", optional: false)
            .Build();

        var connectionString = configuration.GetConnectionString("DefaultConnection")
            ?? throw new InvalidOperationException(
                "Connection string 'DefaultConnection' was not found in appsettings.json.");

        var optionsBuilder = new DbContextOptionsBuilder<StokDbContext>();
        optionsBuilder.UseNpgsql(connectionString);

        return new StokDbContext(optionsBuilder.Options);
    }
}
