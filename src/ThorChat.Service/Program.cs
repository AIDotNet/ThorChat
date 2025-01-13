using System.Text.Json;
using ThorChat.Service.Extensions;
using ThorChat.Service.Middleware;
using ThorChat.Service.Model;
using ThorChat.Service.Options;
using ThorChat.Service.Service;

var builder = WebApplication.CreateBuilder(args);

ThorOptions.Init(builder.Configuration);
WebOptions.Init(builder.Configuration);

builder.Services
    .AddHttpClient("OpenAI",options =>
    {
        // 设置超时时间
        options.Timeout = TimeSpan.FromMinutes(4);

    }).UseSocketsHttpHandler(((handler, provider) =>
    {
        // 超时时间
        handler.PooledConnectionLifetime = TimeSpan.FromMinutes(4);
        handler.PooledConnectionIdleTimeout = TimeSpan.FromMinutes(4);
    }));

builder.Services.AddResponseCompression();
builder.Services.AddHttpForwarder();
builder.Services
    .AddTransient<MarketService>()
    .AddTransient<PluginService>()
    .AddSingleton<FileMiddleware>()
    .AddTransient<ChatService>()
    .AddCors(options =>
    {
        options.AddPolicy("AllowAll",
            builder => builder
                .SetIsOriginAllowed(_ => true)
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials());
    });

var app = builder.Build();

app.UseCors("AllowAll");

app.UseResponseCompression();

app.UseDefaultFiles();

app.UseMiddleware<FileMiddleware>();

app.Use(async (context, next) =>
{
        if (context.Request.Path == "/")
        {
            var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "index.html");
            if (File.Exists(path))
            {
                await context.Response.SendFileAsync(path);
                return;
            }
        }

        if (context.Request.Path.Value?.EndsWith(".js") == true)
        {
            var path = context.Request.Path.Value;

            // 判断是否存在.br文件
            var brPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", path.TrimStart('/') + ".br");
            if (File.Exists(brPath))
            {
                context.Response.Headers.Append("Content-Encoding", "br");
                context.Response.Headers.Append("Content-Type", "application/javascript");

                await context.Response.SendFileAsync(brPath);

                return;
            }

            // 判断是否存在.gz文件
            var gzPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", path.TrimStart('/') + ".gz");
            if (File.Exists(gzPath))
            {
                context.Response.Headers.Append("Content-Encoding", "gzip");
                context.Response.Headers.Append("Content-Type", "application/javascript");
                await context.Response.SendFileAsync(gzPath);
                return;
            }
        }
        else if (context.Request.Path.Value?.EndsWith(".css") == true)
        {
            // 判断是否存在.br文件
            var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot",
                context.Request.Path.Value.TrimStart('/'));
            if (File.Exists(path))
            {
                context.Response.Headers.Append("Content-Type", "text/css");
                await context.Response.SendFileAsync(path);
                return;
            }
        }

        await next(context);

        if (context.Response.StatusCode == 404)
        {
            // 判断是否存在文件
            var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot",
                context.Request.Path.Value.TrimStart('/'));

            if (File.Exists(path))
            {
                context.Response.StatusCode = 200;
                context.Response.Headers.Append("Content-Type",
                    HttpContextExtensions.GetContentType(Path.GetExtension(path)));
                await context.Response.SendFileAsync(path);
                return;
            }

            // 返回index.html
            path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "index.html");

            if (File.Exists(path))
            {
                context.Response.StatusCode = 200;
                await context.Response.SendFileAsync(path);
                return;
            }
        }
});

app.UseStaticFiles();

app.MapGet("/api/market",
    (MarketService service, HttpContext context, string locale) => service.GetAsync(context, locale));

app.MapGet("/api/market/{id}",
    (MarketService service, HttpContext context, string id, string locale) =>
        service.GetIndexAsync(context, id, locale));

app.MapGet("/api/plugin/store",
    (PluginService service, HttpContext context, string locale) => service.GetAsync(context, locale));

app.MapPost("/api/chat/{provider}",
    (ChatService chatService, HttpContext context, string provider) =>
        chatService.PostAsync(context, provider));

app.MapPost("/api/text-to-image/{provider}",
    (ChatService chatService, HttpContext context, string provider,ChatTextToImageInput input) =>
        chatService.TextToImage(context, provider,input));

app.MapGet("/js/env.js", () =>
{
    var webEnv = new
    {
        WebOptions.DEFAULT_AVATAR,
        WebOptions.DEFAULT_USER_AVATAR,
        WebOptions.DEFAULT_INBOX_AVATAR,
        WebOptions.DEFAULT_MODEL,
    };

    // 返回js
    return Results.Text($"window.thor = {JsonSerializer.Serialize(webEnv)};", "application/javascript");
});

app.Run();