using Microsoft.EntityFrameworkCore;
using ShopApp.Infrastructure;
using ShopApp.Infrastructure.Services;
using src.Monolith.ShopApp.Application.Common.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// -------------------------------------------------------
// Services
// -------------------------------------------------------

// Infrastructure: Database, Identity, JWT — all wired in DependencyInjection.cs
builder.Services.AddInfrastructure(builder.Configuration);

// Auth application service
builder.Services.AddScoped<IAuthService, AuthService>();

// CORS — must be registered before builder.Build()
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy
            .WithOrigins(
                "http://localhost:3000",
                "http://localhost:5173",
                "http://127.0.0.1:3000",
                "http://127.0.0.1:5173")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

// Controllers
builder.Services.AddControllers();
builder.Services.AddHttpContextAccessor();

// OpenAPI / Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApi();

var app = builder.Build();

// -------------------------------------------------------
// Middleware pipeline
// -------------------------------------------------------

// Localization
var supportedCultures = new[] { "tr-TR" };
var localizationOptions = new RequestLocalizationOptions()
    .SetDefaultCulture(supportedCultures[0])
    .AddSupportedCultures(supportedCultures)
    .AddSupportedUICultures(supportedCultures);

app.UseRequestLocalization(localizationOptions);

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// Run pending EF Core migrations on startup
using (var scope = app.Services.CreateScope())
{
    try
    {
        var db = scope.ServiceProvider
            .GetRequiredService<ShopApp.Infrastructure.Persistence.ShopAppDbContext>();
        db.Database.Migrate();
    }
    catch (Exception ex)
    {
        app.Logger.LogError(ex, "Migration hatası");
    }
}

app.UseHttpsRedirection();

// CORS middleware — must come before Auth
app.UseCors("AllowFrontend");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
