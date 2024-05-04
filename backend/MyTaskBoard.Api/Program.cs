using Microsoft.EntityFrameworkCore;
using MyTaskBoard.Api.Dto.AutoMapper;
using MyTaskBoard.Core.Entity;
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
builder.Services.AddScoped<ICardRepository, CardRepository>();
builder.Services.AddScoped<IActivityLogRepository, ActivityLogRepository>();


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddAutoMapper(typeof(AutoMapperProfiles));

builder.Services.AddAuthentication();
builder.Services.AddAuthorization();

builder.Services.AddIdentityApiEndpoints<User>()
    .AddEntityFrameworkStores<DataContext>();

builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.MapIdentityApi<User>();
app.UseAuthorization();

app.MapControllers();

app.Run();
