using Yarp.ReverseProxy.Forwarder;

namespace ThorChat.Service.Middleware;

public class FileMiddleware(IHttpForwarder forwarder) : IMiddleware
{
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
#if DEBUG
        if (context.Request.Path.Value?.StartsWith("/api") == false)
        {
            await forwarder.SendAsync(context, "http://localhost:5173",
                new HttpMessageInvoker(new SocketsHttpHandler()), new ForwarderRequestConfig(),new FileHttpTransformer());
        }
        else
        {
            await next(context);
        }
#else
        await next(context);
#endif

    }
}