using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace ShopApp.Infrastructure.Persistence.Context;

public class ShopAppDbContextFactory : IDesignTimeDbContextFactory<ShopAppDbContext>
{
    public ShopAppDbContext CreateDbContext(string[] args)
    {
        var configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", optional: false)
            .Build();

        var connectionString = configuration.GetConnectionString("DefaultConnection")
            ?? throw new InvalidOperationException(
                "Connection string 'DefaultConnection' was not found in appsettings.json.");

        var optionsBuilder = new DbContextOptionsBuilder<ShopAppDbContext>();
        optionsBuilder.UseNpgsql(connectionString);

        return new ShopAppDbContext(optionsBuilder.Options);
    }
}
