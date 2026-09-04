using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace KargoServis.Infrastructure.Persistence;

public class KargoDbContextFactory : IDesignTimeDbContextFactory<KargoDbContext>
{
    public KargoDbContext CreateDbContext(string[] args)
    {
        var configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", optional: false)
            .Build();

        var connectionString = configuration.GetConnectionString("DefaultConnection")
            ?? throw new InvalidOperationException(
                "Connection string 'DefaultConnection' was not found in appsettings.json.");

        var optionsBuilder = new DbContextOptionsBuilder<KargoDbContext>();
        optionsBuilder.UseNpgsql(connectionString);

        return new KargoDbContext(optionsBuilder.Options);
    }
}
