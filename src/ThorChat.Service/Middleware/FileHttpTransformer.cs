using System.Text.Json;
using ThorChat.Service.Options;
using Yarp.ReverseProxy.Forwarder;

namespace ThorChat.Service.Middleware;

public class FileHttpTransformer : HttpTransformer
{
    public override async ValueTask<bool> TransformResponseAsync(HttpContext httpContext,
        HttpResponseMessage? proxyResponse,
        CancellationToken cancellationToken)
    {
        var result = await base.TransformResponseAsync(httpContext, proxyResponse, cancellationToken);

        // 如果请求的是 /
        if (httpContext.Response.ContentType == "text/html" &&
            httpContext.Request.Path == "/")
        {
            // 读取body
            var body = await proxyResponse.Content.ReadAsStringAsync(cancellationToken);

            // 修改body

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

            await httpContext.Response.WriteAsync(body, cancellationToken);

            return false;
        }

        return true;
    }

    // public override async ValueTask TransformResponseTrailersAsync(HttpContext httpContext,
    //     HttpResponseMessage proxyResponse,
    //     CancellationToken cancellationToken)
    // {
    //     // 如果请求的是 /
    //     if (httpContext.Request.Path == "/")
    //     {
    //         // 读取body
    //         var body = await proxyResponse.Content.ReadAsStringAsync(cancellationToken);
    //
    //         // 修改body
    //
    //         var webEnv = new
    //         {
    //             WebOptions.DEFAULT_AVATAR,
    //             WebOptions.DEFAULT_USER_AVATAR,
    //             WebOptions.DEFAULT_INBOX_AVATAR,
    //             WebOptions.DEFAULT_MODEL,
    //         };
    //         var script = """
    //                      <script >
    //                         window.thor  = {};
    //                      </script>
    //                      """;
    //
    //         script = script.Replace("{}", JsonSerializer.Serialize(webEnv));
    //
    //         body = body.Replace("</body>", script + "</body>");
    //
    //         await httpContext.Response.WriteAsync(body, cancellationToken);
    //     }
    //     await base.TransformResponseTrailersAsync(httpContext, proxyResponse, cancellationToken);
    //
    // }
}