using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace KargoServis.Infrastructure.Persistence;

/// <summary>
/// Design-time factory used by EF Core CLI tools (dotnet ef migrations add, database update, etc.)
/// </summary>
public class KargoDbContextFactory : IDesignTimeDbContextFactory<KargoDbContext>
{
    public KargoDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<KargoDbContext>();
        optionsBuilder.UseNpgsql(
            "Host=db;Port=5432;Database=ShopAppKargoDB;Username=postgres;Password=postgres456");
        return new KargoDbContext(optionsBuilder.Options);
    }
}
