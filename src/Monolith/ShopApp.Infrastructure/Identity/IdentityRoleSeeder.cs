using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Identity;

namespace ShopApp.Infrastructure.Identity;

public static class IdentityRoleSeeder
{
    private static readonly string[] RequiredRoles = ["User", "Admin"];

    public static async Task SeedAsync(IServiceProvider services)
    {
        var roleManager = services.GetRequiredService<RoleManager<IdentityRole<Guid>>>();

        foreach (var role in RequiredRoles)
        {
            if (await roleManager.RoleExistsAsync(role))
                continue;

            var result = await roleManager.CreateAsync(new IdentityRole<Guid>(role));
            if (!result.Succeeded)
                throw new InvalidOperationException($"'{role}' rolü oluşturulamadı.");
        }
    }
}
