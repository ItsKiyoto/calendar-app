using System.Text;
using CalendarApp.API.Data;
using CalendarApp.API.Models;
using CalendarApp.API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// ── Database ────────────────────────────────────────────────────────────────
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// ── Identity ───────────────────────────────────────────────────────────────
builder.Services.AddIdentity<AppUser, IdentityRole>( options =>
{
    options.Password.RequireDigit = true;
    options.Password.RequiredLength = 12;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = true;
})
    .AddEntityFrameworkStores<AppDbContext>()
    .AddDefaultTokenProviders();

// ── Authentication ─────────────────────────────────────────────────────────
var jwtKey = builder.Configuration["Jwt:Key"] ?? throw new InvalidOperationException("JWT key not found in configuration.");

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
    };
})
.AddGoogle(options =>
 {
     options.ClientId = builder.Configuration["Authentication:Google:ClientId"]!;
     options.ClientSecret = builder.Configuration["Authentication:Google:ClientSecret"]!;
     options.CallbackPath = "/signin-google";
     options.CorrelationCookie.SameSite = SameSiteMode.Lax;
     options.CorrelationCookie.SecurePolicy = CookieSecurePolicy.SameAsRequest;
 });

// ── Controllers & API tooling ─────────────────────────────────────────────
builder.Services.AddAuthorization();
builder.Services.AddControllers();
builder.Services.AddOpenApi();

// ── Services ──────────────────────────────────────────────────────────────
builder.Services.AddHttpClient();
builder.Services.AddScoped<IWeatherService, WeatherService>();
builder.Services.AddScoped<ITokenService, TokenService>();


var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
