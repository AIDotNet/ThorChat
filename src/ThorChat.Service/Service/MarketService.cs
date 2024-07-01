using System.Runtime.InteropServices;
using ThorChat.Service.Utils;

namespace ThorChat.Service.Service;

/// <summary>
/// Market service.
/// </summary>
public class MarketService
{
    public async ValueTask GetAsync(HttpContext context, string locale)
    {
        var agentMarket = new AgentMarket();

        var url = agentMarket.GetAgentIndexUrl(locale);

        if (!File.Exists(url))
        {
            url = agentMarket.GetAgentIndexUrl("en-US");
        }

        if (!File.Exists(url))
        {
            context.Response.StatusCode = StatusCodes.Status404NotFound;
            return;
        }

        context.Response.ContentType = "application/json";
        await context.Response.SendFileAsync(url);
    }


    public async ValueTask GetIndexAsync(HttpContext context, string id, string locale)
    {
        var agentMarket = new AgentMarket();

        var url = agentMarket.GetAgentUrl(id, locale);

        if (!File.Exists(url))
        {
            url = agentMarket.GetAgentUrl(id);
        }

        if (!File.Exists(url))
        {
            context.Response.StatusCode = StatusCodes.Status404NotFound;
            return;
        }

        context.Response.ContentType = "application/json";
        await context.Response.SendFileAsync(url);
    }
}

public class AgentMarket
{
    private readonly string _baseUrl =
        $"wwwroot{(RuntimeInformation.IsOSPlatform(OSPlatform.Windows) ? "\\" : "/")}agent";

    public string GetAgentIndexUrl(string lang)
    {
        if (Localization.IsLocaleNotSupport(lang))
        {
            return _baseUrl;
        }

        return Path.Combine(AppContext.BaseDirectory, _baseUrl, $"index.{Localization.NormalizeLocale(lang)}.json");
    }

    public string GetAgentUrl(string identifier, string lang = "en-US")
    {
        if (Localization.IsLocaleNotSupport(lang))
        {
            return Path.Combine(AppContext.BaseDirectory, _baseUrl, $"{Localization.NormalizeLocale(lang)}.json");
        }

        return Path.Combine(AppContext.BaseDirectory, _baseUrl,
            $"{identifier}.{Localization.NormalizeLocale(lang)}.json");
    }
}
