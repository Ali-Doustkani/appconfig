var builder = WebApplication.CreateBuilder();
var app = builder.Build();

app.MapGet("/api/health", ()=> new
{
    status = "healthy",
    timestamp = DateTime.UtcNow,
    service = "cloudforge-api"
});

app.Run();