namespace ThorChat.Service.Options;

public static class ThorOptions
{
    public static void Init(IConfiguration configuration)
    {
        ACCESS_CODE = Environment.GetEnvironmentVariable("ACCESS_CODE") ?? configuration["Thor:AccessCode"];
        OPENAI_API_KEY = Environment.GetEnvironmentVariable("OPENAI_API_KEY") ?? configuration["Thor:OpenAI:ApiKey"];
        OPENAI_PROXY_URL = Environment.GetEnvironmentVariable("OPENAI_PROXY_URL") ??
                           configuration["Thor:OpenAI:ProxyUrl"];
    }

    /// <summary>
    /// OpenAI Proxy Url
    /// </summary>
    public static string? OPENAI_PROXY_URL { get; set; }

    /// <summary>
    /// OPENAI API KEY
    /// </summary>
    public static string? OPENAI_API_KEY { get; set; }

    /// <summary>
    /// ACCESS CODE
    /// </summary>
    public static string? ACCESS_CODE { get; set; }
}