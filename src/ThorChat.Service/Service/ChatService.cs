using System.Text.Json;
using System.Text.Json.Serialization;
using Thor.Abstractions;
using Thor.Abstractions.ObjectModels.ObjectModels.RequestModels;
using Thor.AzureOpenAI;
using Thor.OpenAI;
using ThorChat.Service.Options;
using ThorChat.Service.Utils;

namespace ThorChat.Service.Service;

public class ChatService
{
    private const string ThorChatAuth = "X-thor-chat-auth";

    private const string DataTextTemplate =
        "id: {0}\nevent: text\ndata: {1}\n\n";

    private const string DataStopTemplate =
        "id: {0}\nevent: stop\ndata: \"stop\"\n\n";

    public async ValueTask PostAsync(HttpContext context, string provider,
        ChatCompletionCreateRequest completionCreateRequest)
    {
        var token = context.Request.Headers[ThorChatAuth];
        if (string.IsNullOrWhiteSpace(token))
        {
            await Write401Unauthorized(context, provider);
            return;
        }

        var payload = JwtParser.ParseJwt<JWTPayload>(token);

        if (!string.IsNullOrWhiteSpace(ThorOptions.ACCESS_CODE))
        {
            if (payload == null || payload?.AccessCode != ThorOptions.ACCESS_CODE)
            {
                await Write401Unauthorized(context, provider);
                return;
            }
        }

        context.Response.Headers.ContentType = "text/event-stream";

        ChatOptions chatOptions;
        IApiChatCompletionService apiChatCompletionService;

        if (provider.Equals("openai", StringComparison.OrdinalIgnoreCase))
        {
            apiChatCompletionService =
                context.RequestServices.GetRequiredKeyedService<IApiChatCompletionService>(OpenAIServiceOptions
                    .ServiceName);
            chatOptions = new ChatOptions()
            {
                Address = payload.Endpoint ?? ThorOptions.OPENAI_PROXY_URL,
                Key = payload.ApiKey ?? ThorOptions.OPENAI_API_KEY
            };
        }
        else if (provider.Equals("azureopenai", StringComparison.OrdinalIgnoreCase))
        {
            apiChatCompletionService =
                context.RequestServices.GetRequiredKeyedService<IApiChatCompletionService>(AzureOpenAIServiceOptions
                    .ServiceName);

            chatOptions = new ChatOptions()
            {
                Other = payload.AzureApiVersion ?? ThorOptions.AZURE_OPENAI_API_VERSION,
                Address = payload.Endpoint ?? ThorOptions.AZURE_OPENAI_PROXY_URL,
                Key = payload.ApiKey ?? ThorOptions.AZURE_OPENAI_API_KEY
            };
        }
        else
        {
            context.Response.StatusCode = StatusCodes.Status404NotFound;
            return;
        }

        var id = "chatcmpl-" + Guid.NewGuid().ToString("N");
        await foreach (var item in apiChatCompletionService.StreamChatAsync(completionCreateRequest, chatOptions,
                           context.RequestAborted))
        {
            await context.Response.WriteAsync(string.Format(DataTextTemplate, id, JsonSerializer.Serialize(item,new JsonSerializerOptions()
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                WriteIndented = false,
                DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
                PropertyNameCaseInsensitive = true
            })));
        }

        await context.Response.WriteAsync(string.Format(DataStopTemplate, id));
    }

    public async ValueTask Write401Unauthorized(HttpContext context, string provider)
    {
        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
        await context.Response.WriteAsJsonAsync(new
        {
            errorType = "InvalidToken",
            body = new
            {
                error = new
                {
                    errorType = "InvalidToken",
                },
                provider
            }
        });
    }
}

public sealed class JWTPayload
{
    /// <summary>
    /// password
    /// </summary>
    public string? AccessCode { get; set; }

    /// <summary>
    /// Represents the user's API key
    /// If provider need multi keys like bedrock,
    /// this will be used as the checker whether to use frontend key
    /// </summary>
    public string? ApiKey { get; set; }

    /// <summary>
    /// Represents the endpoint of provider
    /// </summary>
    public string? Endpoint { get; set; }

    public string? AzureApiVersion { get; set; }

    public string? AwsAccessKeyId { get; set; }

    public string? AwsRegion { get; set; }

    public string? AwsSecretAccessKey { get; set; }

    /// <summary>
    /// user id
    /// in client db mode it's a uuid
    /// in server db mode it's a user id
    /// </summary>
    public string? UserId { get; set; }
}