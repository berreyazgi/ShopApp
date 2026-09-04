using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace KategoriServis.Infrastructure.Persistence;

/// <summary>
/// Design-time factory used by EF Core CLI tools (dotnet ef migrations add, database update, etc.)
/// </summary>
public class KategoriDbContextFactory : IDesignTimeDbContextFactory<KategoriDbContext>
{
    public KategoriDbContext CreateDbContext(string[] args)
    {
        var configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", optional: false)
            .Build();

        var connectionString = configuration.GetConnectionString("DefaultConnection")
            ?? throw new InvalidOperationException(
                "Connection string 'DefaultConnection' was not found in appsettings.json.");

        var optionsBuilder = new DbContextOptionsBuilder<KategoriDbContext>();
        optionsBuilder.UseNpgsql(connectionString);

        return new KategoriDbContext(optionsBuilder.Options);
    }
}
