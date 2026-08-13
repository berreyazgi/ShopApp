using Microsoft.EntityFrameworkCore;
using StokServis.Infrastructure.Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddOpenApi();

var connectionString = builder.Configuration.GetConnectionString("StokDatabase")
    ?? throw new InvalidOperationException("Connection string 'StokDatabase' is not configured.");

builder.Services.AddDbContext<StokDbContext>(options =>
    options.UseNpgsql(connectionString));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.Run();
