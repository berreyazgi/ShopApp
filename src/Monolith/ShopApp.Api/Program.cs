using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using ShopApp.Infrastructure;
using ShopApp.Infrastructure.Identity;
using ShopApp.Infrastructure.Persistence;

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.UseUrls("http://localhost:5050");
builder.Services.AddInfrastructure(builder.Configuration);

var frontendOrigins = builder.Configuration.GetSection("Cors:FrontendOrigins").Get<string[]>()
    ?.Where(origin => Uri.TryCreate(origin, UriKind.Absolute, out _))
    .Distinct(StringComparer.OrdinalIgnoreCase)
    .ToArray() ?? [];

if (frontendOrigins.Length == 0)
    throw new InvalidOperationException("At least one Cors:FrontendOrigins value must be configured.");

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy => policy
        .WithOrigins(frontendOrigins)
        .AllowAnyHeader()
        .AllowAnyMethod());
});

builder.Services.AddControllers();
builder.Services.AddHttpContextAccessor();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "ShopApp API",
        Version = "v1",
        Description = "ShopApp REST API"
    });

    var bearerScheme = new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Description = "Bearer {token}",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        Reference = new OpenApiReference { Id = "Bearer", Type = ReferenceType.SecurityScheme }
    };

    options.AddSecurityDefinition("Bearer", bearerScheme);
    options.AddSecurityRequirement(new OpenApiSecurityRequirement { { bearerScheme, [] } });
});

var app = builder.Build();

var supportedCultures = new[] { "tr-TR" };
app.UseRequestLocalization(new RequestLocalizationOptions()
    .SetDefaultCulture(supportedCultures[0])
    .AddSupportedCultures(supportedCultures)
    .AddSupportedUICultures(supportedCultures));

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(ui =>
    {
        ui.SwaggerEndpoint("/swagger/v1/swagger.json", "ShopApp API v1");
        ui.RoutePrefix = "swagger";
    });
}

using (var scope = app.Services.CreateScope())
{
    try
    {
        var db = scope.ServiceProvider.GetRequiredService<ShopAppDbContext>();
        await db.Database.MigrateAsync();
    }
    catch (Exception ex)
    {
        app.Logger.LogError(ex, "Database migration failed. Existing schema was left unchanged.");
    }

    try
    {
        await IdentityRoleSeeder.SeedAsync(scope.ServiceProvider);
    }
    catch (Exception ex)
    {
        app.Logger.LogError(ex, "Identity role seed failed.");
    }
}

app.UseHttpsRedirection();
app.UseCors("AllowFrontend");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();
