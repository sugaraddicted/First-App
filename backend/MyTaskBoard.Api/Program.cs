using Microsoft.EntityFrameworkCore;
using MyTaskBoard.Infrastructure.Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("Postgres");

builder.Services.AddDbContextPool<DataContext>(options =>
{
    options.UseNpgsql(connectionString,
        b => b.MigrationsAssembly("MyTaskBoard.Infrastructure"));
});
builder.Services.AddPooledDbContextFactory<DataContext>(options =>
{
    options.UseNpgsql(connectionString,
        b => b.MigrationsAssembly("MyTaskBoard.Infrastructure"));
});
builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
