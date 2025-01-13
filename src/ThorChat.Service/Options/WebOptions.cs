using System.Text.Json;

namespace ThorChat.Service.Options;

public class WebOptions
{
    public static void Init(IConfiguration configuration)
    {
        DEFAULT_MODEL = Environment.GetEnvironmentVariable("DEFAULT_MODEL") ?? configuration["Thor:DefaultModel"];
        DEFAULT_AVATAR = Environment.GetEnvironmentVariable("DEFAULT_AVATAR") ?? configuration["Thor:DefaultAvatar"];
        DEFAULT_USER_AVATAR = Environment.GetEnvironmentVariable("DEFAULT_USER_AVATAR") ??
                              configuration["Thor:DefaultUserAvatar"];
        DEFAULT_INBOX_AVATAR = Environment.GetEnvironmentVariable("DEFAULT_INBOX_AVATAR") ??
                               configuration["Thor:DefaultInboxAvatar"];

        OPENAI_MODEL_LIST = Environment.GetEnvironmentVariable("OPENAI_MODEL_LIST") ?? string.Empty;

        // 获取wwwroot下的index.html
        var path = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "wwwroot", "index.html");

        if (!File.Exists(path))
        {
            return;
        }

        var body = File.ReadAllText(path);

        var webEnv = new
        {
            WebOptions.DEFAULT_AVATAR,
            WebOptions.DEFAULT_USER_AVATAR,
            WebOptions.DEFAULT_INBOX_AVATAR,
            WebOptions.DEFAULT_MODEL,
            WebOptions.OPENAI_MODEL_LIST,
        };
        var script = """
                     <script >
                        window.thor  = {};
                     </script>
                     """;

        script = script.Replace("{}", JsonSerializer.Serialize(webEnv));

        body = body.Replace("</body>", script + "</body>");

        File.WriteAllText(path, body);
    }

    public static string DEFAULT_MODEL { get; set; } = "gpt-3.5-turbo";

    public static string DEFAULT_AVATAR { get; set; } = "🤖";

    public static string DEFAULT_USER_AVATAR { get; set; } = "😀";

    public static string DEFAULT_INBOX_AVATAR { get; set; } = "🤯";

    public static string OPENAI_MODEL_LIST { get; set; }
}