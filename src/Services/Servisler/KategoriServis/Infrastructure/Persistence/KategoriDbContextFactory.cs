using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace KategoriServis.Infrastructure.Persistence;

/// <summary>
/// Design-time factory used by EF Core CLI tools (dotnet ef migrations add, database update, etc.)
/// </summary>
public class KategoriDbContextFactory : IDesignTimeDbContextFactory<KategoriDbContext>
{
    public KategoriDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<KategoriDbContext>();
        optionsBuilder.UseNpgsql(
            "Host=db;Port=5432;Database=ShopAppKategoriDB;Username=postgres;Password=postgres456");
        return new KategoriDbContext(optionsBuilder.Options);
    }
}
