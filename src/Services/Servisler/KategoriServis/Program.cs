using KategoriServis.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddOpenApi();

var connectionString = builder.Configuration.GetConnectionString("KategoriDatabase")
    ?? throw new InvalidOperationException("Connection string 'KategoriDatabase' is not configured.");

builder.Services.AddDbContext<KategoriDbContext>(options =>
    options.UseNpgsql(connectionString));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.Run();
