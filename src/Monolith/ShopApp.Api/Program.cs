using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ShopApp.Infrastructure.Identity;
using ShopApp.Infrastructure.Persistence;

var builder = WebApplication.CreateBuilder(args);

// -------------------------------------------------------
// Services
// -------------------------------------------------------

// Database — PostgreSQL via EF Core
builder.Services.AddDbContext<ShopAppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// ASP.NET Core Identity
builder.Services
    .AddIdentity<ApplicationUser, IdentityRole>(options =>
    {
        options.Password.RequireDigit           = true;
        options.Password.RequiredLength         = 8;
        options.Password.RequireNonAlphanumeric = false;
        options.Password.RequireUppercase       = false;
        options.Password.RequireLowercase       = false;
    })
    .AddEntityFrameworkStores<ShopAppDbContext>()
    .AddDefaultTokenProviders();

// Controllers
builder.Services.AddControllers();

// OpenAPI / Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApi();

var app = builder.Build();

//localization
var supportedCultures = new[] { "tr-TR" };
var localizationOptions = new RequestLocalizationOptions()
    .SetDefaultCulture(supportedCultures[0])
    .AddSupportedCultures(supportedCultures)
    .AddSupportedUICultures(supportedCultures);

app.UseRequestLocalization(localizationOptions);

if (app.Environment.IsDevelopment())
{
    using IServiceScope scope = app.Services.CreateScope();

    try
    {
        ShopAppDbContext dbContext =
            scope.ServiceProvider.GetRequiredService<ShopAppDbContext>();

        dbContext.Database.Migrate();
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

// Apply pending EF Core migrations on startup (convenient for Docker/dev)
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ShopAppDbContext>();
    db.Database.Migrate();
}

app.Run();
