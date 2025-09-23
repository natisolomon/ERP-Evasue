using App.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using App.Application.Interfaces;
using App.Application.Services;
using App.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Configure MySQL DbContext
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

// Add controllers & Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IStaffRepository, StaffRepository>();
builder.Services.AddScoped<StaffService>();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();
app.MapControllers();

app.Run();
