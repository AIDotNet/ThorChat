namespace ThorChat.Service.Utils;


public static class Localization
{
    private const string DEFAULT_LANG = "en";

    public static bool IsLocaleNotSupport(string locale)
    {
        return NormalizeLocale(locale) == DEFAULT_LANG || !SupportedLocales.Contains(locale);
    }

    private static readonly string[] Locales =
    [
        "ar",
        "bg-BG",
        "de-DE",
        "en-US",
        "es-ES",
        "fr-FR",
        "ja-JP",
        "ko-KR",
        "pt-BR",
        "ru-RU",
        "tr-TR",
        "zh-CN",
        "zh-TW",
        "vi-VN"
    ];

    public static string NormalizeLocale(string locale = null)
    {
        if (string.IsNullOrEmpty(locale))
        {
            return "en-US";
        }

        if (locale.StartsWith("ar"))
        {
            return "ar";
        }

        foreach (var l in Locales)
        {
            if (l.StartsWith(locale, StringComparison.OrdinalIgnoreCase))
            {
                return l;
            }
        }

        return "en-US";
    }

    public class LocaleOption
    {
        public string Label { get; set; }
        public string Value { get; set; }
    }

    public static readonly List<LocaleOption> LocaleOptions = new List<LocaleOption>
    {
        new LocaleOption { Label = "English", Value = "en-US" },
        new LocaleOption { Label = "简体中文", Value = "zh-CN" }
    };

    public static readonly List<string> SupportedLocales = Locales.Concat(new[] { "en", "zh" }).ToList();
}