using System.Collections.Concurrent;
using Azure;
using Azure.AI.OpenAI;

namespace ThorChat.Service;

public static class AzureOpenAIFactory
{
    private const string AddressTemplate = "{0}/openai/deployments/{1}/chat/completions?api-version=2024-02-15-preview";
    private static readonly ConcurrentDictionary<string, AzureOpenAIClient> Clients = new();

    public static string GetAddress(string address,string version, string model)
    {
        return string.Format(AddressTemplate, address.TrimEnd('/'), model, version);
    }

    public static AzureOpenAIClient CreateClient(string address, string apiKey, string currentVersion)
    {
        var key = $"{apiKey}_{address}_{currentVersion}";
        return Clients.GetOrAdd(key, (_) =>
        {
            var version = AzureOpenAIClientOptions.ServiceVersion.V2024_04_01_Preview;

            switch (currentVersion)
            {
                case "2024-05-01-preview":
                    version = AzureOpenAIClientOptions.ServiceVersion.V2024_05_01_Preview;
                    break;
                case "2024_06_01":
                    version = AzureOpenAIClientOptions.ServiceVersion.V2024_06_01;
                    break;
                case "2024-04-01-preview":
                    version = AzureOpenAIClientOptions.ServiceVersion.V2024_04_01_Preview;
                    break;
            }

            var client = new AzureOpenAIClient(new Uri(address), new AzureKeyCredential(apiKey),
                new AzureOpenAIClientOptions(version));

            return client;
        });
    }
}