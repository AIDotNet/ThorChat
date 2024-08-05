using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace ThorChat.Service;

public static class HttpClientExtensions
{
    public static JsonSerializerOptions DefaultOptions => new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
        Encoder = System.Text.Encodings.Web.JavaScriptEncoder.UnsafeRelaxedJsonEscaping,
    };

    public static async Task<HttpResponseMessage> HttpRequestRaw(this HttpClient httpClient, string url,
        object? postData,
        string token)
    {
        HttpRequestMessage req = new(HttpMethod.Post, url);

        if (postData != null)
        {
            if (postData is HttpContent data)
            {
                req.Content = data;
            }
            else if (postData is string str)
            {
                var stringContent = new StringContent(str, Encoding.UTF8, "application/json");
                req.Content = stringContent;
            }
            else
            {
                string jsonContent = JsonSerializer.Serialize(postData, DefaultOptions);
                var stringContent = new StringContent(jsonContent, Encoding.UTF8, "application/json");
                req.Content = stringContent;
            }
        }

        if (!string.IsNullOrEmpty(token))
        {
            req.Headers.Add("Authorization", $"Bearer {token}");
        }


        var response = await httpClient.SendAsync(req, HttpCompletionOption.ResponseHeadersRead);

        return response;
    }


    public static async Task<HttpResponseMessage> HttpRequest(this HttpClient httpClient, string url,
        object? postData,
        string token)
    {
        HttpRequestMessage req = new(HttpMethod.Post, url);

        if (postData != null)
        {
            if (postData is HttpContent data)
            {
                req.Content = data;
            }
            else if (postData is string str)
            {
                var stringContent = new StringContent(str, Encoding.UTF8, "application/json");
                req.Content = stringContent;
            }
            else
            {
                string jsonContent = JsonSerializer.Serialize(postData, DefaultOptions);
                var stringContent = new StringContent(jsonContent, Encoding.UTF8, "application/json");
                req.Content = stringContent;
            }
        }

        if (!string.IsNullOrEmpty(token))
        {
            req.Headers.Add("Authorization", $"Bearer {token}");
        }
        
        var response = await httpClient.SendAsync(req);

        return response;
    }

    public static async Task<HttpResponseMessage> HttpRequestAzureRaw(this HttpClient httpClient, string url,
        object? postData,
        string token)
    {
        HttpRequestMessage req = new(HttpMethod.Post, url);

        if (postData != null)
        {
            if (postData is HttpContent data)
            {
                req.Content = data;
            }
            else if (postData is string str)
            {
                var stringContent = new StringContent(str, Encoding.UTF8, "application/json");
                req.Content = stringContent;
            }
            else
            {
                string jsonContent = JsonSerializer.Serialize(postData, DefaultOptions);
                var stringContent = new StringContent(jsonContent, Encoding.UTF8, "application/json");
                req.Content = stringContent;
            }
        }

        if (!string.IsNullOrEmpty(token))
        {
            req.Headers.Add("api-key", token);
        }

        var response = await httpClient.SendAsync(req, HttpCompletionOption.ResponseHeadersRead);

        return response;
    }
}