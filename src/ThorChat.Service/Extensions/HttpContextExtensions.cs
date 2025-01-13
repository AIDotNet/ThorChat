namespace ThorChat.Service.Extensions;

public static class HttpContextExtensions
{
    /// <summary>
    /// 设置响应为 text/event-stream 相关的头
    /// </summary>
    /// <param name="context"></param>
    /// <returns></returns>
    public static void SetEventStreamHeaders(this HttpContext context)
    {
        context.Response.ContentType = "text/event-stream;charset=utf-8;";
        context.Response.Headers.TryAdd("Cache-Control", "no-cache");
        context.Response.Headers.TryAdd("Connection", "keep-alive");
    }

    public static string GetContentType(string extension)
    {
        return extension switch
        {
            ".html" => "text/html",
            ".htm" => "text/html",
            ".css" => "text/css",
            ".js" => "application/javascript",
            ".json" => "application/json",
            ".png" => "image/png",
            ".jpg" => "image/jpeg",
            ".jpeg" => "image/jpeg",
            ".gif" => "image/gif",
            ".svg" => "image/svg+xml",
            ".ico" => "image/x-icon",
            ".mp4" => "video/mp4",
            ".webm" => "video/webm",
            ".ogg" => "video/ogg",
            ".mp3" => "audio/mp3",
            ".wav" => "audio/wav",
            ".webp" => "image/webp",
            ".woff" => "font/woff",
            ".woff2" => "font/woff2",
            ".ttf" => "font/ttf",
            ".eot" => "font/eot",
            ".otf" => "font/otf",
            ".pdf" => "application/pdf",
            ".zip" => "application/zip",
            ".rar" => "application/x-rar-compressed",
            ".7z" => "application/x-7z-compressed",
            ".txt" => "text/plain",
            ".csv" => "text/csv",
            ".xml" => "text/xml",
            ".doc" => "application/msword",
            ".docx" => "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ".xls" => "application/vnd.ms-excel",
            ".xlsx" => "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            ".ppt" => "application/vnd.ms-powerpoint",
            ".pptx" => "application/vnd.openxmlformats-officedocument.presentationml.presentation",
            _ => "application/octet-stream"
        };
    }

    /// <summary>
    /// 获取userAgent
    /// </summary>
    /// <param name="context"></param>
    /// <returns></returns>
    public static string GetUserAgent(this HttpContext context)
    {
        // 获取UserAgent，提取有用信息
        var userAgent = context.Request.Headers.UserAgent.FirstOrDefault();

        // 提取有用信息
        if (userAgent != null)
        {
            var index = userAgent.IndexOf('(');
            if (index > 0)
            {
                userAgent = userAgent[..index];
            }
            else
            {
                userAgent = userAgent switch
                {
                    not null when userAgent.Contains("Windows") => "Windows",
                    not null when userAgent.Contains("Mac") => "Mac",
                    not null when userAgent.Contains("Linux") => "Linux",
                    not null when userAgent.Contains("Android") => "Android",
                    not null when userAgent.Contains("iPhone") => "iPhone",
                    not null when userAgent.Contains("iPad") => "iPad",
                    _ => "未知"
                };
            }
        }

        return userAgent ?? "未知";
    }
}