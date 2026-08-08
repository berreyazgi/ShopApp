using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using ShopApp.Infrastructure;
using ShopApp.Infrastructure.Services;
using src.Monolith.ShopApp.Application.Common.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// -------------------------------------------------------
// Services
// -------------------------------------------------------
// Set the URL for the application to listen on for port error
builder.WebHost.UseUrls("http://localhost:5050");
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

// ── Swagger / OpenAPI with JWT Bearer support ──────────────────────────────
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title       = "ShopApp API",
        Version     = "v1",
        Description = "ShopApp Modular Monolith REST API — JWT Bearer authentication required for protected endpoints.",
    });

    // Define the JWT Bearer security scheme
    var jwtScheme = new OpenApiSecurityScheme
    {
        Name         = "Authorization",
        Description  = "Enter your JWT token in the format: **Bearer {token}**",
        In           = ParameterLocation.Header,
        Type         = SecuritySchemeType.Http,
        Scheme       = "bearer",          // must be lowercase
        BearerFormat = "JWT",
        Reference    = new OpenApiReference
        {
            Id   = "Bearer",
            Type = ReferenceType.SecurityScheme,
        },
    };

    options.AddSecurityDefinition("Bearer", jwtScheme);

    // Apply the JWT scheme globally to all operations
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        { jwtScheme, Array.Empty<string>() },
    });
});

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
    app.UseSwagger();
    app.UseSwaggerUI(ui =>
    {
        ui.SwaggerEndpoint("/swagger/v1/swagger.json", "ShopApp API v1");
        ui.RoutePrefix = "swagger"; // accessible at http://localhost:5048/swagger
        ui.DisplayRequestDuration();
        ui.EnableDeepLinking();
    });
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
