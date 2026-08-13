using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace StokServis.Infrastructure.Persistence;

/// <summary>
/// Design-time factory used by EF Core CLI tools (dotnet ef migrations add, database update, etc.)
/// </summary>
public class StokDbContextFactory : IDesignTimeDbContextFactory<StokDbContext>
{
    public StokDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<StokDbContext>();
        optionsBuilder.UseNpgsql(
            "Host=127.0.0.1;Port=5432;Database=ShopAppStokDB;Username=postgres;Password=postgres456");
        return new StokDbContext(optionsBuilder.Options);
    }
}
