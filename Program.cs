using backend;
using Microsoft.Extensions.FileProviders;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<FormsDbContext>(opt => opt.UseInMemoryDatabase("Forms"));

builder.Services.AddAuthorization();
builder.Services
    .AddGraphQLServer()
    .AddQueryType<Query>()
    .AddMutationType<Mutation>();

var app = builder.Build();

// Serve React app from ./frontend/dist directory
app.UseFileServer(new FileServerOptions
{
    FileProvider = new PhysicalFileProvider(
           System.IO.Path.Combine(builder.Environment.ContentRootPath, "frontend", "dist"))
});

app.UseHttpsRedirection();

app.UseAuthorization();

// Following code ensures that we have seeded the DB with default values
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<FormsDbContext>();
    dbContext.Database.EnsureCreated();
}

app.MapGraphQL();

app.Run();
