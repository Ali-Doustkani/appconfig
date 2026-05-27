var builder = WebApplication.CreateBuilder();
var app = builder.Build();

app.MapGet("/health", ()=> new
{
    status = "healthy",
    timestamp = DateTime.UtcNow,
    service = "cloudforge-api"
});

app.Run();