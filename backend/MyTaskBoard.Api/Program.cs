using Microsoft.EntityFrameworkCore;
using MyTaskBoard.Infrastructure.Persistence;
using MyTaskBoard.Infrastructure.Repository;
using MyTaskBoard.Infrastructure.Repository.Interfaces;

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
builder.Services.AddScoped<IBoardListRepository, BoardListRepository>();
builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
