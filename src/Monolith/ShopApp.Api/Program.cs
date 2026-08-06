using Microsoft.EntityFrameworkCore;
using ShopApp.Infrastructure;
using ShopApp.Infrastructure.Persistence;

var builder = WebApplication.CreateBuilder(args);

// -------------------------------------------------------
// Services
// -------------------------------------------------------

// All infrastructure: DbContext, Identity, JWT Auth, IJwtTokenGenerator
builder.Services.AddInfrastructure(builder.Configuration);

// Controllers
builder.Services.AddControllers();
builder.Services.AddHttpContextAccessor();

// OpenAPI / Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApi();

var app = builder.Build();

// Localization
var supportedCultures = new[] { "tr-TR" };
var localizationOptions = new RequestLocalizationOptions()
    .SetDefaultCulture(supportedCultures[0])
    .AddSupportedCultures(supportedCultures)
    .AddSupportedUICultures(supportedCultures);

app.UseRequestLocalization(localizationOptions);

// Apply pending EF Core migrations on startup
using (var scope = app.Services.CreateScope())
{
    try
    {
        var dbContext = scope.ServiceProvider.GetRequiredService<ShopAppDbContext>();
        dbContext.Database.Migrate(
            var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<Guid>>
        );
    }
    catch (Exception ex)
    {
        app.Logger.LogError(ex, "Migration hatasi");
    }
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
