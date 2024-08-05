using System.Text;
using System.Text.Json;
using ThorChat.Service.Model;
using ThorChat.Service.Options;
using ThorChat.Service.Utils;

namespace ThorChat.Service.Service;

public class ChatService(IHttpClientFactory httpClientFactory)
{
    private const string ThorChatAuth = "X-thor-chat-auth";

    private const string DataTextTemplate =
        "id: {0}\nevent: text\ndata: {1}\n\n";

    private const string DataStopTemplate =
        "id: {0}\nevent: stop\ndata: \"stop\"\n\n";

    public async ValueTask PostAsync(HttpContext context, string provider)
    {
        var token = context.Request.Headers[ThorChatAuth];
        if (string.IsNullOrWhiteSpace(token))
        {
            await Write401Unauthorized(context, provider, "InvalidToken");
            return;
        }

        var payload = JwtParser.ParseJwt<JWTPayload>(token);

        if (!string.IsNullOrWhiteSpace(ThorOptions.ACCESS_CODE))
        {
            if (payload == null || payload?.AccessCode != ThorOptions.ACCESS_CODE)
            {
                await Write401Unauthorized(context, provider, "InvalidAccessCode");
                return;
            }
        }

        context.Response.Headers.ContentType = "text/event-stream";
        var id = "chatcmpl-" + Guid.NewGuid().ToString("N");

        var address = (payload?.Endpoint ?? ThorOptions.OPENAI_PROXY_URL)?.TrimEnd('/');
        var key = (payload?.ApiKey ?? ThorOptions.OPENAI_API_KEY);

        var httpClient = httpClientFactory.CreateClient("OpenAI");
        if (provider.Equals("openai", StringComparison.OrdinalIgnoreCase))
        {
            using var memoryStream = new MemoryStream();
            await context.Request.Body.CopyToAsync(memoryStream);
            var str = Encoding.UTF8.GetString(memoryStream.ToArray());

            var response = await httpClient.HttpRequestRaw(address + "/v1/chat/completions", str
                , key);

            using StreamReader reader = new(await response.Content.ReadAsStreamAsync(context.RequestAborted));


            string? line = string.Empty;
            while ((line = await reader.ReadLineAsync().ConfigureAwait(false)) != null)
            {
                line += Environment.NewLine;

                if (line.StartsWith('{'))
                {
                    await context.Response.WriteAsync(string.Format(DataTextTemplate,
                        "chatcmpl-" + Guid.NewGuid().ToString("N"), line));
                    break;
                }

                if (line.StartsWith("data:"))
                    line = line["data:".Length..];

                line = line.Trim();

                if (line == "[DONE]")
                {
                    break;
                }

                if (line.StartsWith(":"))
                {
                    continue;
                }


                if (string.IsNullOrWhiteSpace(line)) continue;

                await context.Response.WriteAsync(string.Format(DataTextTemplate,
                    "chatcmpl-" + Guid.NewGuid().ToString("N"), line));
            }
        }
        else if (provider.Equals("azure", StringComparison.OrdinalIgnoreCase))
        {
            var client = httpClientFactory.CreateClient("OpenAI");


            using var memoryStream = new MemoryStream();
            await context.Request.Body.CopyToAsync(memoryStream);
            var str = Encoding.UTF8.GetString(memoryStream.ToArray());
            var model = JsonSerializer.Deserialize<ChatCompletionInput>(str);

            var url = AzureOpenAIFactory.GetAddress(address, payload?.AzureApiVersion!,
                model!.Model);

            var response = await client.HttpRequestAzureRaw(url,
                str, key);

            using var stream = new StreamReader(await response.Content.ReadAsStreamAsync(context.RequestAborted));

            using StreamReader reader = new(await response.Content.ReadAsStreamAsync(context.RequestAborted));
            string? line = string.Empty;
            while ((line = await reader.ReadLineAsync().ConfigureAwait(false)) != null)
            {
                line += Environment.NewLine;

                if (line.StartsWith('{'))
                {
                    // 如果是json数据则直接返回
                    await context.Response.WriteAsync(string.Format(DataTextTemplate,
                        "chatcmpl-" + Guid.NewGuid().ToString("N"), line));

                    break;
                }

                if (line.StartsWith("data:"))
                    line = line["data:".Length..];

                line = line.Trim();

                if (line == "[DONE]")
                {
                    break;
                }

                if (line.StartsWith(":"))
                {
                    continue;
                }


                if (string.IsNullOrWhiteSpace(line)) continue;

                await context.Response.WriteAsync(string.Format(DataTextTemplate,
                    "chatcmpl-" + Guid.NewGuid().ToString("N"), line));
            }
        }
        else
        {
            context.Response.StatusCode = StatusCodes.Status404NotFound;
            return;
        }

        await context.Response.WriteAsync(string.Format(DataStopTemplate, id));
    }

    public async ValueTask TextToImage(HttpContext context, string provider, ChatTextToImageInput input)
    {
        var token = context.Request.Headers[ThorChatAuth];
        if (string.IsNullOrWhiteSpace(token))
        {
            await Write401Unauthorized(context, provider, "InvalidToken");
            return;
        }

        var payload = JwtParser.ParseJwt<JWTPayload>(token);

        if (!string.IsNullOrWhiteSpace(ThorOptions.ACCESS_CODE))
        {
            if (payload == null || payload?.AccessCode != ThorOptions.ACCESS_CODE)
            {
                await Write401Unauthorized(context, provider, "InvalidAccessCode");
                return;
            }
        }

        var address = (payload?.Endpoint ?? ThorOptions.OPENAI_PROXY_URL)?.TrimEnd('/');
        var key = (payload?.ApiKey ?? ThorOptions.OPENAI_API_KEY);

        var httpClient = httpClientFactory.CreateClient("OpenAI");

        if (provider.Equals("openai", StringComparison.OrdinalIgnoreCase))
        {
            var response = await httpClient.HttpRequest(address + "/v1/images/generations", input
                , key);

            var str = await response.Content.ReadAsStringAsync();
            
            var value = await response.Content.ReadFromJsonAsync<ChatTextToImageResult>();

            await context.Response.WriteAsJsonAsync(value.Data.Select(x=>x.Url));
        }
    }

    public async ValueTask Write401Unauthorized(HttpContext context, string provider, string errorType)
    {
        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
        await context.Response.WriteAsJsonAsync(new
        {
            errorType = errorType,
            body = new
            {
                error = new
                {
                    errorType = errorType,
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