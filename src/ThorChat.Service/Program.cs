using Thor.Abstractions.ObjectModels.ObjectModels.RequestModels;
using ThorChat.Service.Options;
using ThorChat.Service.Service;

var builder = WebApplication.CreateBuilder(args);

ThorOptions.Init(builder.Configuration);


builder.Services
    .AddOpenAIService()
    .AddAzureOpenAIService();

builder.Services.AddResponseCompression();

builder.Services.AddTransient<MarketService>()
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

// 重定向到 index.html
app.Use(async (context, next) =>
{
    if (context.Request.Path == "/")
    {
        context.Request.Path = "/index.html";
    }

    await next();

    if (context.Response.StatusCode == 404)
    {
        context.Request.Path = "/index.html";
        await next();
    }
});

app.UseCors("AllowAll");

app.UseResponseCompression();

app.UseStaticFiles();

app.MapGet("/api/market",
    (MarketService service, HttpContext context, string locale) => service.GetAsync(context, locale));

app.MapGet("/api/market/{id}",
    (MarketService service, HttpContext context, string id, string locale) =>
        service.GetIndexAsync(context, id, locale));

app.MapGet("/api/plugin/store",
    (PluginService service, HttpContext context, string locale) => service.GetAsync(context, locale));

app.MapPost("/api/chat/{provider}",
    (ChatService chatService, HttpContext context, string provider,
            ChatCompletionCreateRequest completionCreateRequest) =>
        chatService.PostAsync(context, provider, completionCreateRequest));

app.Run();