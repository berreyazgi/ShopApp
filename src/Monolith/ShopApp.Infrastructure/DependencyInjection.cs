using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using ShopApp.Infrastructure.Authentication;
using ShopApp.Infrastructure.Identity;
using ShopApp.Infrastructure.Persistence;
using ShopApp.Infrastructure.Services;
using ShopApp.Application.Abstractions;

namespace ShopApp.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        // ── Database ─────────────────────────────────────────────────────────
        services.AddDbContext<ShopAppDbContext>(options =>
            options.UseNpgsql(configuration.GetConnectionString("DefaultConnection")));

        // ── Identity ─────────────────────────────────────────────────────────
        services
            .AddIdentity<ApplicationUser, IdentityRole<Guid>>(options =>
            {
                options.User.RequireUniqueEmail = true;

                options.Password.RequiredLength         = 8;
                options.Password.RequireDigit           = true;
                options.Password.RequireLowercase       = true;
                options.Password.RequireUppercase       = true;
                options.Password.RequireNonAlphanumeric = false;

                options.Lockout.MaxFailedAccessAttempts = 5;
                options.Lockout.DefaultLockoutTimeSpan  = TimeSpan.FromMinutes(15);
            })
            .AddEntityFrameworkStores<ShopAppDbContext>()
            .AddDefaultTokenProviders();

        // ── JWT Settings ──────────────────────────────────────────────────────
        // Bind the "JwtSettings" section from appsettings.json to JwtSettings class.
        // IOptions<JwtSettings> is now available throughout the app via DI.
        services.Configure<JwtSettings>(
            configuration.GetSection(JwtSettings.SectionName));

        // Read settings eagerly here for validation + AddJwtBearer setup
        var jwtSettings = configuration
            .GetSection(JwtSettings.SectionName)
            .Get<JwtSettings>()
            ?? throw new InvalidOperationException(
                $"'{JwtSettings.SectionName}' section is missing in appsettings.json.");

        if (string.IsNullOrWhiteSpace(jwtSettings.SecretKey))
            throw new InvalidOperationException(
                $"'{JwtSettings.SectionName}:SecretKey' is not configured in appsettings.json.");

        // ── Authentication — JWT Bearer ───────────────────────────────────────
        services
            .AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme    = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme             = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer           = true,
                    ValidateAudience         = true,
                    ValidateLifetime         = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer              = jwtSettings.Issuer,
                    ValidAudience            = jwtSettings.Audience,
                    IssuerSigningKey         = new SymmetricSecurityKey(
                                                 Encoding.UTF8.GetBytes(jwtSettings.SecretKey))
                };
            });

        services.AddAuthorization();

        // ── IJwtTokenGenerator ────────────────────────────────────────────────
        // Resolves JwtSettings from IOptions<JwtSettings> — no direct config reads here.
        services.AddScoped<IJwtTokenGenerator>(sp =>
        {
            var settings = sp.GetRequiredService<IOptions<JwtSettings>>().Value;
            return new JwtTokenGenerator(settings);
        });
        services.AddScoped<IAuthService, AuthService>(

        );

        return services;
    }
}
