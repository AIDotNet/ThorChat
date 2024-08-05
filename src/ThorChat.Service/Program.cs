using System.Text.Json;
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

builder.Services
    .AddTransient<MarketService>()
    .AddTransient<PluginService>()
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

app.Use(async (context, next) =>
{
    await next(context);

    if (context.Response.StatusCode == 404 && !Path.HasExtension(context.Request.Path.Value))
    {
        context.Request.Path = "/index.html";
        await next(context);
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