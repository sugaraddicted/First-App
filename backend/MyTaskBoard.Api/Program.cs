using Microsoft.EntityFrameworkCore;
using MyTaskBoard.Api.Dto.AutoMapper;
using MyTaskBoard.Api.Helpers;
using MyTaskBoard.Api.Middleware;
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
builder.Services.AddCors();
builder.Services.AddScoped<IBoardListRepository, BoardListRepository>();
builder.Services.AddScoped<IBoardRepository, BoardRepository>();
builder.Services.AddScoped<ICardRepository, CardRepository>();
builder.Services.AddScoped<IActivityLogRepository, ActivityLogRepository>();
builder.Services.AddScoped<IActivityLogger, ActivityLogger>();


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddAutoMapper(typeof(AutoMapperProfiles));

builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseMiddleware<ExceptionMiddleware>();
app.UseCors(builder => builder.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200"));
app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.MapControllers();

app.Run();
