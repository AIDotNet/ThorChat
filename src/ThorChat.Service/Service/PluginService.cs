using System.Runtime.InteropServices;

namespace ThorChat.Service.Service;

public class PluginService
{
    public async ValueTask GetAsync(HttpContext context, string locale)
    {
        var agentMarket = new PluginStore();

        var url = agentMarket.GetPluginIndexUrl(locale);

        if (!File.Exists(url))
        {
            url = agentMarket.GetPluginIndexUrl("en-US");
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

public class PluginStore
{
    private readonly string _baseUrl =
        $"wwwroot{(RuntimeInformation.IsOSPlatform(OSPlatform.Windows) ? "\\" : "/")}plugin";

    public string GetPluginIndexUrl(string lang)
    {
        if (Localization.IsLocaleNotSupport(lang))
        {
            return _baseUrl;
        }

        return Path.Combine(AppContext.BaseDirectory, _baseUrl, $"index.{Localization.NormalizeLocale(lang)}.json");
    }
}